/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListHeader :header="header">
        <Select
            v-show="!isSearchButtonClicked"
            :value="selectedOption"
            class="options-select"
            solid
            small
            :options="options"
            @input="onLanguageSelect" />
        <TextField
            v-if="isSearchButtonClicked"
            :value="searchResult"
            class="search-text-field"
            solid
            autofocus
            small
            placeholder="Search..."
            @input="debouncedSearch"
            @focus="onSearchFocus">
            <template #append>
                <IconSearch :fill-color="searchIconFillColor" />
            </template>
        </TextField>
        <Fab
            class="search-button"
            @click.native="onSearchButtonClick">
            <template #icon="{ color }">
                <Component
                    :is="searchButtonIconComponent"
                    :fill-color="color" />
            </template>
        </Fab>
    </ListHeader>
</template>

<script>
import { debounce } from 'debounce';
import {
    GREEN, GRAPHITE, WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import ListHeader from '@Core/components/List/ListHeader';
import Fab from '@Core/components/Buttons/Fab';
import Select from '@Core/components/Inputs/Select/Select';
import TextField from '@Core/components/Inputs/TextField';
import IconSearch from '@Core/components/Icons/Actions/IconSearch';

export default {
    name: 'ListSearchSelectHeader',
    components: {
        ListHeader,
        Fab,
        Select,
        TextField,
        IconSearch,
    },
    props: {
        header: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        selectedOption: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isSearchButtonClicked: false,
            isSearchFocused: false,
            searchResult: null,
        };
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
        searchButtonIconComponent() {
            return this.isSearchButtonClicked
                ? () => import('@Core/components/Icons/Window/IconClose')
                : IconSearch;
        },
        searchIconFillColor() {
            return this.isSearchFocused
                ? GREEN
                : GRAPHITE;
        },
    },
    created() {
        this.debouncedSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.debouncedSearch;
    },
    methods: {
        onSearch(value) {
            this.searchResult = value;
            this.$emit('searchResult', value);
        },
        onLanguageSelect(value) {
            this.$emit('selectOption', value);
        },
        onSearchButtonClick() {
            this.isSearchButtonClicked = !this.isSearchButtonClicked;

            if (!this.isSearchButtonClicked && this.searchResult !== '') {
                this.searchResult = '';
                this.onSearch(this.searchResult);
            }
        },
        onSearchFocus(isFocused) {
            this.isSearchFocused = isFocused;
        },
    },
};
</script>

<style lang="scss" scoped>
    .options-select, .search-text-field {
        grid-column: 1;
        grid-row: 2;
    }

    .search-button {
        grid-column: 2;
        grid-row: 2;
    }
</style>
