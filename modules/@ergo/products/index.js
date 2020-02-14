/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/products',
    type: 'page',
    moduleRelations: [
        '@ergo/product-templates',
        '@ergo/comments',
    ],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Products': '/',
        },
    },
    router: [
        {
            name: 'catalog',
            path: '/catalog',
            component: Pages.Products,
            meta: {
                access: true,
                title: 'Catalog',
                group: {
                    title: 'Products',
                    menuPosition: 2,
                    icon: Icons.Product,
                },
                isMenu: true,
                menuPosition: 1,
                privileges: {
                    namespace: Privileges.PRODUCT.namespace,
                    read: Privileges.PRODUCT.read,
                },
                redirectTo: 'catalog-products',
            },
            children: [
                {
                    name: 'catalog-products',
                    path: 'products',
                    component: Tabs.ProductGridTab,
                    meta: {
                        title: '',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
        },
        {
            name: 'product-id',
            path: '/catalog/product/:id',
            component: Pages.ProductEdit,
            meta: {
                isMenu: false,
                redirectTo: 'product-id-general',
            },
            children: [
                {
                    name: 'product-id-general',
                    path: 'general',
                    component: Tabs.ProductBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Catalog',
                                routeName: 'catalog-products',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'product-id-template',
                    path: 'template',
                    component: Tabs.ProductTemplateTab,
                    meta: {
                        title: 'Product template',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Catalog',
                                routeName: 'catalog-products',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'product-id-comments',
                    path: 'comments',
                    component: Tabs.ProductCommentsTab,
                    meta: {
                        title: 'Comments',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Catalog',
                                routeName: 'catalog-products',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'product-id-history',
                    path: 'history',
                    component: Tabs.ProductHistoryGridTab,
                    meta: {
                        title: 'History',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Catalog',
                                routeName: 'catalog-products',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
        },
    ],
    store: [
        {
            directory: 'productsDraft',
            name: 'productsDraft',
        },
    ],
};