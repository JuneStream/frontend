/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <AttributeGroupTranslationForm
                v-for="(languageCode, index) in languageCodes"
                :key="index"
                :language-code="languageCode" />
        </template>
    </TranslationsTab>
</template>

<script>
export default {
    name: 'AttributeGroupTranslationsTab',
    components: {
        TranslationsTab: () => import('@Core/components/Card/Tabs/TranslationsTab'),
        AttributeGroupTranslationForm: () => import('@Attributes/components/Forms/AttributeGroupTranslationForm'),
    },
};
</script>
