/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridColumn
        v-bind="$attrs"
        v-on="$listeners">
        <template #header="{ title }">
            <GridHeaderCell :title="title" />
        </template>
        <template
            #cell="{
                data,
                dataIndex,
                columnIndex,
                rowIndex,
                rowId,
                columnId,
                languageCode,
                isLocked,
                isCopyable,
            }">
            <GridCheckDataCell
                :key="`${rowId}|${columnId}`"
                :data="data"
                :data-index="dataIndex"
                :row-id="rowId"
                :column-id="columnId"
                :column-index="columnIndex"
                :row-index="rowIndex"
                :language-code="languageCode"
                :edit-key-code="32"
                :is-locked="isLocked"
                :is-copyable="isCopyable"
                @input="onValueChange" />
        </template>
    </GridColumn>
</template>

<script>
import { mapActions } from 'vuex';
import GridCheckDataCell from '@Users/components/Grid/Layout/Table/Cells/Data/GridCheckDataCell';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';
import GridHeaderCell from '@Core/components/Grid/Layout/Table/Cells/Header/GridHeaderCell';

export default {
    name: 'GridPrivilegeColumn',
    components: {
        GridColumn,
        GridCheckDataCell,
        GridHeaderCell,
    },
    inheritAttrs: false,
    methods: {
        ...mapActions('grid', [
            'setDraftValue',
        ]),
        onValueChange({ rowId, columnId, value }) {
            if (columnId !== 'read' && value) {
                this.setDraftValue({
                    rowId,
                    columnId,
                    value: false,
                });
                this.setDraftValue({
                    rowId,
                    columnId: 'read',
                    value: true,
                });
            }

            if (columnId === 'read') {
                this.setDraftValue({
                    rowId,
                    columnId: 'create',
                    value: false,
                });
                this.setDraftValue({
                    rowId,
                    columnId: 'update',
                    value: false,
                });
                this.setDraftValue({
                    rowId,
                    columnId: 'delete',
                    value: false,
                });
            }

            this.setDraftValue({
                rowId,
                columnId,
                value,
            });
        },
    },
};
</script>
