/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridColumn
        v-bind="$attrs"
        v-on="$listeners">
        <template
            #filter="{
                columnIndex,
                isLocked,
                rowIndex,
                filter,
            }">
            <GridNumericFilterCell
                :is-locked="isLocked"
                :filter="filter"
                :column-index="columnIndex"
                :row-index="rowIndex"
                @filter="$listeners.filter" />
        </template>
        <template
            #cell="{
                data,
                dataIndex,
                columnIndex,
                rowIndex,
                rowId,
                columnId,
                isLocked,
                isCopyable,
            }">
            <GridNumericDataCell
                :key="`${rowId}|${columnId}`"
                :data="data"
                :data-index="dataIndex"
                :row-id="rowId"
                :column-id="columnId"
                :column-index="columnIndex"
                :row-index="rowIndex"
                :is-locked="isLocked"
                :is-copyable="isCopyable"
                @input="$listeners.editCell"
                @copy="$listeners.copyCells" />
        </template>
    </GridColumn>
</template>

<script>
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';
import GridNumericDataCell from '@Core/components/Grid/Layout/Table/Cells/Data/GridNumericDataCell';

export default {
    name: 'GridIntegerColumn',
    components: {
        GridColumn,
        GridNumericDataCell,
        GridNumericFilterCell: () => import('@Core/components/Grid/Layout/Table/Cells/Filter/GridNumericFilterCell'),
    },
    inheritAttrs: false,
};
</script>
