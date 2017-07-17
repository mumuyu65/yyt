<template>
    <div id="page-wrapper">
        <div id="page-inner">
            <div class="zhibo">
                <video src=""></video>
            </div>
            <div class="comment-box">
                <div class="comment" v-for="c in comment_list">
                    <div class="head-file">
                        <img :src="c.src" alt="">
                    </div>
                    <div class="info">
                        <div class="name">{{c.name}} <span>{{c.time}}</span></div>
                        <div class="description">{{c.description}}</div>
                    </div>
                    <div class="btn btn-danger btn-lg pull-right">通过</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'zhibo',
        data() {
            return {
                user: {},
                comment_list: [
                    { src: '../assets/cheins.jpeg', name: 'Cheins', time: '6 Ds ago', description: 'live content', isPass: false },
                    { src: '../assets/cheins.jpeg', name: 'Cheins', time: '6 Ds ago', description: 'live content', isPass: false },
                    { src: '../assets/cheins.jpeg', name: 'Cheins', time: '6 Ds ago', description: 'live content', isPass: false }
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    .zhibo {
        padding: 3rem;
    }
    .comment-box {
        padding: 3rem;
        .comment {
            padding: 2rem;
            margin: 1rem 0;
            border-radius: .7rem;
            background-color: #F3F3F3;
            &:after {
                display: table;
                content: ' ';
                clear: both;
            }
            .head-file {
                width: 5rem;
                height: 5rem;
                border-radius: 50%;
                float: left;
                img {
                    width: 100%;
                    border-radius: 50%;
                }
            }
            .info {
                float: left;
                margin-left: 2rem;
                .name {
                    font-size: 2.2rem;
                    font-weight: bold;
                    span {
                        font-size: 1.4rem;
                        font-weight: normal;
                    }
                }
            }
        }
    }
</style>
