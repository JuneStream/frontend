/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="isUserAllowedToUpdate"
                :columns="columns"
                :data-count="filtered"
                :data="data"
                :is-header-visible="true"
                :is-centered-view="true"
                :is-basic-filter="true"
                :is-action-column="true"
                @editRow="onEditRow"
                @removeRow="onRemoveRow"
                @fetchData="getGridData">
                <template #actions>
                    <Button
                        title="NEW UNIT"
                        :theme="secondaryTheme"
                        :disabled="!isUserAllowedToCreate"
                        :size="smallSize"
                        @click.native="onShowModal">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </Grid>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

export default {
    name: 'UnitsSettingsGridTab',
    components: {
        Grid: () => import('@Core/components/Grid/Grid'),
        ResponsiveCenteredViewTemplate,
        Button,
        IconAdd,
    },
    mixins: [fetchGridDataMixin({ path: 'units' })],
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        isUserAllowedToCreate() {
            return this.$hasAccess(['SETTINGS_CREATE']);
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['SETTINGS_UPDATE']);
        },
    },
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'unit-id-general', params: { id: args[lastIndex] } });
        },
        onShowModal() {
            this.$emit('showModal');
        },
    },
};
</script>
