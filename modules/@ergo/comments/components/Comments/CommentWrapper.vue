/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="comment">
        <div class="comment__header">
            <slot name="header" />
        </div>
        <div class="comment__content">
            <slot name="content" />
        </div>
        <div class="comment__footer">
            <slot name="footer" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'CommentWrapper',
};
</script>

<style lang="scss" scoped>
    .comment {
        display: flex;
        flex-direction: column;
        width: auto;
        padding: 24px;
        box-sizing: border-box;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
        color: $GRAPHITE_DARK;

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__content {
            padding: 16px 0;
        }

        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: $GRAPHITE;
        }
    }
</style>
