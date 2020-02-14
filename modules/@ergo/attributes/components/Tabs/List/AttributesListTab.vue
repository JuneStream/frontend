/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchSelectHeader
            v-if="isSelectLanguage"
            header="Attributes"
            :options="languageOptions"
            :selected-option="language.value"
            @searchResult="onSearch"
            @selectOption="onSelect" />
        <ListSearchHeader
            v-else
            header="Attributes"
            @searchResult="onSearch" />
        <AttributesList :language-code="language.key" />
        <div class="add-fab-button">
            <FabButton
                :disabled="!$hasAccess(['ATTRIBUTE_CREATE'])"
                @click.native="addAttribute">
                <template #icon="{ fillColor }">
                    <IconAdd :fill-color="fillColor" />
                </template>
            </FabButton>
        </div>
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getKeyByValue } from '@Core/models/objectWrapper';
import { WHITE } from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'AttributesListTab',
    components: {
        VerticalTabBarListWrapper: () => import('@Core/components/Tab/VerticalTabBarListWrapper'),
        AttributesList: () => import('@Attributes/components/Lists/AttributesList'),
        ListSearchSelectHeader: () => import('@Core/components/List/ListSearchSelectHeader'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
        FabButton: () => import('@Core/components/Buttons/FabButton'),
        IconAdd: () => import('@Core/components/Icons/Actions/IconAdd'),
    },
    props: {
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            language: {},
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('dictionaries', {
            languages: state => state.languages,
        }),
        whiteColor() {
            return WHITE;
        },
        languageOptions() {
            return Object.values(this.languages);
        },
        listDataType() {
            return 'attributes';
        },
    },
    created() {
        this.language = {
            key: this.userLanguageCode,
            value: this.languages[this.userLanguageCode],
        };
    },
    methods: {
        ...mapActions('list', [
            'setFilter',
            'getGroups',
            'getElements',
        ]),
        onSearch(value) {
            this.setFilter(value);
            this.getElements({
                listType: this.listDataType,
                languageCode: this.language.key,
            });
        },
        onSelect(value) {
            this.language = {
                key: getKeyByValue(this.languages, value),
                value,
            };

            Promise.all([
                this.getGroups({
                    listType: this.listDataType,
                    languageCode: this.language.key,
                }),
                this.getElements({
                    listType: this.listDataType,
                    languageCode: this.language.key,
                }),
            ]);
        },
        addAttribute() {
            this.$router.push({ name: 'attribute-new-general' });
        },
    },
};
</script>

<style lang="scss" scoped>
    .add-fab-button {
        position: absolute;
        bottom: 16px;
        right: 16px;
    }
</style>