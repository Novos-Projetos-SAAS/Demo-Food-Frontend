// 'use client';

// import { useState } from 'react';
// import toast from 'react-hot-toast';
// import {
//     criarPedido,
//     criarPedidoAdmin,
//     listarPedidoPorTelefoneUsuario
// } from '@/services/pedidosService.js';

// export function usePedidos() {
//     const [enviando, setEnviando] = useState(false);
//     const [buscando, setBuscando] = useState(false);

//     /**
//      * FINALIZAR PEDIDO
//      * A impressão automática é centralizada no NotificationListener através do Socket.IO.
//      */
//     const finalizarPedidoNoBanco = async (payload, options = {}) => {
//         const admin = options.admin === true;
//         setEnviando(true);

//         try {
//             const response = admin ? await criarPedidoAdmin(payload) : await criarPedido(payload);
//             toast.success('Pedido registrado com sucesso!');
//             return response;
//         } catch (error) {
//             const data = error?.response?.data;

//             if (data?.code === 'ALIMENTOS_INDISPONIVEIS' || data?.code === 'PRODUTOS_INDISPONIVEIS' || data?.code === 'PRODUTOS_ALTERADOS' || data?.code === 'LOJA_FECHADA') {
//                 return {
//                     status: 'conflict',
//                     code: data.code,
//                     message: data.message,
//                     details: data.details || null
//                 };
//             }

//             toast.error(data?.message || 'Falha ao registrar pedido no servidor.');
//             return null;
//         } finally {
//             setEnviando(false);
//         }
//     };

//     /**
//      * BUSCAR PEDIDO
//      */
//     const buscarPedidoPorTelefoneUsuario = async (telefone) => {
//         setBuscando(true);

//         try {
//             const numeroLimpo = String(telefone || '').replace(/\D/g, '');

//             if (numeroLimpo.length < 10 || numeroLimpo.length > 11) {
//                 return null;
//             }

//             return await listarPedidoPorTelefoneUsuario(numeroLimpo);
//         } catch (error) {
//             console.error('Erro na busca:', error);
//             return null;
//         } finally {
//             setBuscando(false);
//         }
//     };

//     return {
//         finalizarPedidoNoBanco,
//         buscarPedidoPorTelefoneUsuario,
//         buscando,
//         enviando
//     };
// }


'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import {
    obterChaveTentativaPedido,
    limparTentativaPedido
} from '@/utils/idempotenciaPedido.js';

import {
    criarPedido,
    criarPedidoAdmin,
    listarPedidoPorTelefoneUsuario
} from '@/services/pedidosService.js';

export function usePedidos() {
    const [enviando, setEnviando] = useState(false);
    const [buscando, setBuscando] = useState(false);

    // Bloqueio imediato para chamadas concorrentes.
    const envioEmAndamentoRef = useRef(false);

    /**
     * FINALIZAR PEDIDO
     *
     * Funciona para o cliente e para o administrador.
     * A impressão automática continua sendo gerenciada
     * pelo NotificationListener através do Socket.IO.
     */
    const finalizarPedidoNoBanco = async (
        payload,
        options = {}
    ) => {
        const admin = options.admin === true;

        // Impede outro envio enquanto um está em andamento.
        if (envioEmAndamentoRef.current) {
            return null;
        }

        envioEmAndamentoRef.current = true;
        setEnviando(true);

        try {
            // Recupera ou cria um UUID para esta tentativa.
            const chave = await obterChaveTentativaPedido(
                payload,
                admin
            );

            const response = admin
                ? await criarPedidoAdmin(payload, chave)
                : await criarPedido(payload, chave);

            // Só limpa a tentativa após confirmação.
            limparTentativaPedido(admin);

            toast.success(
                response.reutilizado
                    ? 'Seu pedido já estava confirmado!'
                    : 'Pedido registrado com sucesso!'
            );

            return response;

        } catch (error) {
            const data = error?.response?.data;

            // Mantém os tratamentos de indisponibilidade.
            if (
                data?.code === 'ALIMENTOS_INDISPONIVEIS' ||
                data?.code === 'PRODUTOS_INDISPONIVEIS' ||
                data?.code === 'PRODUTOS_ALTERADOS' ||
                data?.code === 'MARMITAS_ESPECIAIS_ALTERADAS' ||
                data?.code === 'LOJA_FECHADA'
            ) {
                return {
                    status: 'conflict',
                    code: data.code,
                    message: data.message,
                    details: data.details || null
                };
            }

            // Uma falha de rede não significa que
            // o servidor deixou de registrar o pedido.
            const falhaIndeterminada =
                !error?.response ||
                error.response.status >= 500;

            if (falhaIndeterminada) {
                toast.error(
                    'Não foi possível confirmar a resposta. ' +
                    'Seu pedido pode ter sido registrado. ' +
                    'Verifique e tente novamente sem alterar o carrinho.',
                    { duration: 8500 }
                );
            } else {
                toast.error(
                    data?.message ||
                    'Não foi possível registrar o pedido. Confira os dados.'
                );
            }

            return null;

        } finally {
            // Libera o botão após a requisição terminar,
            // independentemente do resultado.
            envioEmAndamentoRef.current = false;
            setEnviando(false);
        }
    };

    /**
     * BUSCAR PEDIDO POR TELEFONE
     */
    const buscarPedidoPorTelefoneUsuario = async (
        telefone
    ) => {
        setBuscando(true);

        try {
            const numeroLimpo = String(telefone || '')
                .replace(/\D/g, '');

            if (
                numeroLimpo.length < 10 ||
                numeroLimpo.length > 11
            ) {
                return null;
            }

            return await listarPedidoPorTelefoneUsuario(
                numeroLimpo
            );

        } catch (error) {
            console.error('Erro na busca:', error);
            return null;

        } finally {
            setBuscando(false);
        }
    };

    return {
        finalizarPedidoNoBanco,
        buscarPedidoPorTelefoneUsuario,
        buscando,
        enviando
    };
}
