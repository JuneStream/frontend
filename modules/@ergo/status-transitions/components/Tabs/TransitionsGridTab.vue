/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="$hasAccess(['WORKFLOW_UPDATE'])"
                :columns="columns"
                :data-count="filtered"
                :data="data"
                :is-basic-filter="true"
                :is-action-column="true"
                @editRow="onEditRow"
                @removeRow="onRemoveRow"
                @fetchData="getGridData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

export default {
    name: 'TransitionsGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('@Core/components/Grid/Grid'),
    },
    mixins: [fetchGridDataMixin({ path: 'workflow/default/transitions' })],
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;
            const id = `${args[lastIndex - 1].replace(/%20/g, ' ')}--${args[lastIndex].replace(/%20/g, ' ')}`;

            this.$router.push({
                name: 'transition-id-general',
                params: { id },
            });
        },
    },
};
</script>
