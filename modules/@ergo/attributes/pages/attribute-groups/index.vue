/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Attribute groups"
            :is-read-only="$isReadOnly('ATTRIBUTE')">
            <template #mainAction>
                <Button
                    title="NEW ATTRIBUTE GROUP"
                    :size="smallSize"
                    :disabled="!$hasAccess(['ATTRIBUTE_CREATE'])"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs">
            <template #item>
                <HorizontalTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalTabBar>
        <CreateAttributeGroupModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @create="onCreatedData" />
    </Page>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';

export default {
    name: 'AttributeTabs',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        CreateAttributeGroupModalForm: () => import('@Attributes/components/Modals/CreateAttributeGroupModalForm'),
        Button,
        IconAdd,
    },
    mixins: [gridModalMixin],
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
    },
    head() {
        return {
            title: 'Attribute groups - Ergonode',
        };
    },
};
</script>
