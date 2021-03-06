/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryTreePage
        :title="code"
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getMappedTreeData } from '@Trees/models/treeMapper';
import { isThereAnyTranslation, getParsedTranslations } from '@Core/models/mappers/translationsMapper';
import { getParentRoutePath } from '@Core/models/navigation/tabs';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'EditCategoryTree',
    components: {
        CategoryTreePage: () => import('@Trees/components/Pages/CategoryTreePage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({ store, params }) {
        await Promise.all([
            store.dispatch('tree/clearStorage'),
            store.dispatch('translations/clearStorage'),
        ]);
        await store.dispatch('tree/getTreeById', {
            treeId: params.id,
        });
    },
    computed: {
        ...mapState('tree', {
            treeId: state => state.treeId,
            code: state => state.code,
        }),
        ...mapState('gridDesigner', {
            fullGridData: state => state.fullGridData,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
    },
    destroyed() {
        this.clearGridDesignerStorage();
    },
    methods: {
        ...mapActions('tree', [
            'updateTree',
            'removeCategoryTree',
        ]),
        ...mapActions('gridDesigner', {
            clearGridDesignerStorage: 'clearStorage',
        }),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onRemove() {
            const isConfirmed = confirm('Are you sure you want to delete this category tree?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirmed) {
                this.removeCategoryTree({
                    onSuccess: this.onRemoveSuccess,
                });
            }
        },
        onSave() {
            let { name } = this.translations;
            if (isThereAnyTranslation(name)) {
                name = getParsedTranslations(name);
            }
            this.updateTree({
                id: this.treeId,
                data: {
                    name,
                    categories: getMappedTreeData(this.fullGridData),
                },
                onSuccess: this.onUpdateSuccess,
                onError: this.onError,
            });
        },
        onUpdateSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Tree updated' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Category tree removed' });
            this.$router.push({ name: 'category-trees-grid' });
        },
    },
    head() {
        return {
            title: `${this.code} - Category trees - Ergonode`,
        };
    },
};
</script>
