/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <label
        class="info-hint"
        :title="hint">
        <IconError />
    </label>
</template>

<script>
import IconError from '@Core/components/Icons/Feedback/IconError';

export default {
    name: 'ErrorHint',
    components: {
        IconError,
    },
    props: {
        hint: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .info-hint {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        transform: scale(0.8);
    }
</style>
