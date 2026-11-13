
const CACHE = new Map();

const PREFIXO = 'marmitaria_confirmacao_pendente_v1_';

function chaveArmazenamento(admin) {
    return PREFIXO + (admin ? 'admin' : 'publico');
}

function ler(chave) {
    try {
        const salvo = sessionStorage.getItem(chave);

        if (salvo) {
            return JSON.parse(salvo);
        }
    } catch {
        // Se o armazenamento estiver indisponível,
        // utiliza o cache em memória.
    }

    return CACHE.get(chave) || null;
}

function salvar(chave, valor) {
    CACHE.set(chave, valor);

    try {
        sessionStorage.setItem(
            chave,
            JSON.stringify(valor)
        );
    } catch {
        // Mantém os dados em memória.
    }
}

export function limparTentativaPedido(admin = false) {
    const chave = chaveArmazenamento(admin);

    CACHE.delete(chave);

    try {
        sessionStorage.removeItem(chave);
    } catch {
        // Ignora falhas no armazenamento.
    }
}

export async function obterChaveTentativaPedido(
    payload,
    admin = false
) {
    const serializado = JSON.stringify(payload);

    const bytes = new TextEncoder().encode(serializado);

    const hash = await crypto.subtle.digest(
        'SHA-256',
        bytes
    );

    const assinatura = Array.from(
        new Uint8Array(hash),
        (numero) => numero.toString(16).padStart(2, '0')
    ).join('');

    const chave = chaveArmazenamento(admin);
    const anterior = ler(chave);

    // Mesmo conteúdo: reutiliza o identificador.
    if (
        anterior?.assinatura === assinatura &&
        anterior?.uuid
    ) {
        return anterior.uuid;
    }

    // Nova tentativa: gera um UUID.
    const uuid = crypto.randomUUID();

    salvar(chave, {
        assinatura,
        uuid
    });

    return uuid;
}
