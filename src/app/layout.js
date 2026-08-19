
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "react-hot-toast";

import { PedidoProvider } from "../context/PedidoContext.js";

import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/** @type {import("next").Metadata} */
export const metadata = {
    metadataBase: new URL(SITE_URL),

    title: {
        default: 'Demo Food | Sistema DEMO de Marmitaria',
        template: '%s | Demo Food'
    },

    description: 'Monte sua marmita do seu jeito com comida caseira, ingredientes frescos e muito sabor. Faça seu pedido online para entrega ou retirada.',

    applicationName: 'Demo Food',

    keywords: [
        'marmitaria',
        'marmita',
        'marmitas',
        'marmita delivery',
        'delivery de marmita',
        'comida caseira',
        'comida brasileira',
        'almoço',
        'marmita personalizada',
        'montar marmita',
        'pedido online',
        'entrega de comida',
        'retirada de marmita'
    ],

    authors: [
        {
            name: 'Demo Food'
        }
    ],

    creator: 'Demo Food',
    publisher: 'Demo Food',
    category: 'food',

    alternates: {
        canonical: '/'
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1
        }
    },

    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: '/',
        siteName: 'Demo Food',
        title: 'Demo Food | Sistema DEMO de Marmitaria',
        description: 'Monte sua marmita do seu jeito com comida caseira, ingredientes frescos e muito sabor. Peça online para entrega ou retirada.',
        images: [
            {
                url: '/demo-og.png',
                width: 1200,
                height: 630,
                alt: 'Demo Food - Ambiente de demonstração',
                type: 'image/png'
            }
        ]
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Demo Food | Sistema DEMO de Marmitaria',
        description: 'Monte sua marmita do seu jeito e faça seu pedido online para entrega ou retirada.',
        images: ['/demo-og.png']
    },

    formatDetection: {
        email: false,
        address: false,
        telephone: false
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
            <body suppressHydrationWarning>
                <PedidoProvider>
                    {children}
                    {/* TOASTER PREMIUM CUSTOMIZADO */}
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            // Estilo geral da caixinha do Toast
                            style: {
                                background: 'var(--color-surface)',
                                color: 'var(--color-text-primary)', // Zinco 900
                                border: '1px solid var(--color-border)',
                                borderRadius: '6px', // Canto mais reto
                                padding: '16px',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            },
                            // Estilo específico para mensagens de Sucesso
                            success: {
                                iconTheme: {
                                    primary: 'var(--color-success)', // Verde escuro premium
                                    secondary: 'var(--color-on-brand)',
                                },
                            },
                            // Estilo específico para mensagens de Erro (Limites de categoria)
                            error: {
                                iconTheme: {
                                    primary: 'var(--color-danger)', // Nosso Laranja Queimado (Accent)
                                    secondary: 'var(--color-on-brand)',
                                },
                                style: {
                                    // Dá um leve tom de alerta no fundo quando for erro
                                    backgroundColor: 'var(--color-danger-soft)',
                                    borderColor: 'var(--color-danger-border)',
                                    color: 'var(--color-danger)',
                                }
                            },
                        }}
                    />
                </PedidoProvider>
            </body>
        </html>
    );
}
