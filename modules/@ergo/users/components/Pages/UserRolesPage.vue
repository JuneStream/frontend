/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="$isReadOnly('USER_ROLE')"
            @navigateBack="onDismiss">
            <template #mainAction>
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE ROLE"
                    :disabled="!$hasAccess(['USER_ROLE_DELETE'])"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Footer flex-end>
            <Button
                title="SAVE ROLE"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import categoryManagementPageBaseMixin from '@Core/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'UserRolesPage',
    mixins: [categoryManagementPageBaseMixin],
    computed: {
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
};
</script>
