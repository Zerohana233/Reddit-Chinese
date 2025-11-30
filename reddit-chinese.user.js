// ==UserScript==
// @name         Reddit Chinese UI
// @namespace    https://github.com/
// @version      1.3.2
// @description  使用预定义词典将 Reddit 网页界面本地化为简体中文，同时忽略用户生成内容。
// @author       OpenAI
// @match        *://www.reddit.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    "use strict";

    /**
     * 用户自定义区域：在这里添加你自己的翻译。
     * 示例：
     *   "Moderator Log": "管理员日志",
     *   "Queue": "队列"
     */
    const userTranslationMap = {
        // 在下方添加或覆盖翻译；如果不需要可保持为空。
    };

    /**
     * 静态界面文本的基础翻译表。
     * 键是界面中的英文原文；值是对应的简体中文翻译。
     * 该表尽量全面，用户可按需扩展。
     */
    const baseTranslationMap = {
        // 全局导航
        "Home": "主页",
        "Popular": "热门",
        "All": "全部",
        "Latest": "最新",
        "Top": "最热",
        "Hot": "热门",
        "Best": "最佳",
        "Controversial": "争议",
        "Rising": "上升",
        "News": "新闻",
        "Explore": "探索",
        "Search": "搜索",
        "Search Reddit": "搜索 Reddit",
        "Communities": "社区",
        "Community": "社区",
        "Create Community": "创建社区",
        "Create a community": "创建社区",
        "Start a community": "开始一个社区",
        "Create Post": "创建帖子",
        "Create Community Now": "立即创建社区",
        "Notifications": "通知",
        "Messages": "消息",
        "Inbox": "收件箱",
        "All Communities": "所有社区",
        "More": "更多",
        "Moderation": "管理",
        "Answers": "问答",
        "Answers BETA": "问答（测试版）",
        "Resources": "资源",
        "Games on Reddit": "Reddit 游戏",
        "Custom Feeds": "自定义订阅",
        "Create Custom Feed": "创建自定义订阅",
        "Add to custom feed": "添加到自定义订阅源",
        "Add to favorites": "添加到收藏夹",
        "Recent": "最近",

        // 用户菜单与设置
        "My Profile": "我的个人资料",
        "Profile": "个人资料",
        "View Profile": "查看资料",
        "User Settings": "用户设置",
        "Settings": "设置",
        "Account": "账户",
        "Privacy": "隐私",
        "Language": "语言",
        "Help Center": "帮助中心",
        "Log In": "登录",
        "Sign Up": "注册",
        "Logout": "退出",
        "Dark Mode": "夜间模式",
        "Light Mode": "日间模式",
        "Moderator Tools": "管理员工具",
        "Mod Tools": "管理工具",
        "View All": "查看全部",

        // 子版块相关
        "Joined": "已加入",
        "Join": "加入",
        "Create": "创建",
        "Member": "成员",
        "Members": "成员",
        "Online": "在线",
        "Community Details": "社区详情",
        "Community Options": "社区选项",
        "About Community": "关于社区",
        "Rules": "规则",
        "Moderators": "管理员",
        "Community topics": "社区话题",
        "Theme": "主题",
        "Sort": "排序",
        "Sort by": "排序方式",

        // 帖子元数据与操作
        "Comments": "评论",
        "Comment": "评论",
        "Shares": "分享",
        "Share": "分享",
        "Save": "保存",
        "Saved": "已保存",
        "Hide": "隐藏",
        "Report": "举报",
        "Edit flair": "编辑标签",
        "Edit": "编辑",
        "Delete": "删除",
        "Awards": "奖励",
        "Award": "授予奖励",
        "Give Award": "给予奖励",
        "Crosspost": "交叉发布",
        "crosspost": "交叉发布",
        "Upvote": "赞成",
        "Downvote": "反对",
        "Vote": "投票",
        "Sort by:": "排序方式：",
        "Best Comments": "最佳评论",
        "Top Comments": "最热评论",
        "New": "最新",
        "Old": "最早",
        "Hot Posts": "热门帖子",
        "Pinned": "置顶",
        "Posted by": "发布者",
        "View Discussions": "查看讨论",
        "Open in app": "在应用中打开",

        // 评论与回复
        "Reply": "回复",
        "View replies": "查看回复",
        "Submit": "提交",
        "Cancel": "取消",
        "Continue this thread": "继续此话题",
        "Load more comments": "加载更多评论",
        "level 1": "层主",
        "Collapse": "收起",
        "Expand": "展开",

        // 按钮与表单
        "Save changes": "保存更改",
        "Back to top": "回到顶部",
        "Apply": "应用",
        "Clear": "清除",
        "Update": "更新",
        "Continue": "继续",
        "Next": "下一步",
        "Previous": "上一步",
        "Close": "关闭",
        "Submit post": "提交帖子",
        "Try again": "再试一次",

        // 新手引导与提示
        "Welcome": "欢迎",
        "Get Started": "开始",
        "Skip": "跳过",
        "See more": "查看更多",
        "Show More": "显示更多",
        "Show Less": "显示更少",
        "Learn More": "了解更多",
        "Recommended": "推荐",
        "Follow": "关注",
        "Unfollow": "取消关注",

        // 排序与筛选
        "Hot": "热门",
        "Rising": "上升",
        "Top": "最热",
        "New": "最新",
        "Today": "今日",
        "This Week": "本周",
        "This Month": "本月",
        "This Year": "今年",
        "All Time": "全部时间",
        "Filter": "筛选",
        "View": "查看",
        "Card": "卡片",
        "Classic": "经典",

        // 通知与收件箱
        "New Message": "新消息",
        "Mark all as read": "全部标为已读",
        "Messages": "消息",
        "Chat": "聊天",
        "Mod Mail": "管理员邮件",
        "Activity": "活动",
        "Invitations": "邀请",

        // 杂项界面
        "Advertising": "广告",
        "Careers": "招聘",
        "Help": "帮助",
        "Terms": "条款",
        "Privacy Policy": "隐私政策",
        "User Agreement": "用户协议",
        "Content Policy": "内容政策",
        "Moderator Code of Conduct": "管理员行为准则",
        "About Reddit": "关于 Reddit",
        "Advertise": "广告合作",
        "Developer Platform": "开发者平台",
        "Reddit Pro": "Reddit 专业版",
        "Blog": "博客",
        "Back": "返回",
        "Forward": "前进",
        "View all": "查看全部",
        "View all comments": "查看所有评论",
        "Search results": "搜索结果",
        "No results": "无结果",
        "Load More": "加载更多",
        "Retry": "重试",
        "Copied": "已复制",

        // 认证与表单
        "Username": "用户名",
        "Password": "密码",
        "Email": "邮箱",
        "Continue with Google": "使用 Google 继续",
        "Continue with Apple": "使用 Apple 继续",
        "Forgot password": "忘记密码",
        "Remember me": "记住我",
        "Sign in": "登录",
        "Sign up": "注册",
        "Continue with Email": "使用邮箱继续",

        // 标签与标记
        "Flair": "标签",
        "Add flair": "添加标签",
        "Remove flair": "移除标签",

        // 排序选项
        "Relevance": "相关性",
        "Hot": "热门",
        "Top": "最热",
        "New": "最新",
        "Comments": "评论",

        // 杂项标签
        "Moderator": "管理员",
        "Original Poster": "楼主",
        "OP": "楼主",
        "Cake Day": "蛋糕日",
        "Posted": "已发布",
        "Edited": "已编辑",
        "Community": "社区",
        "Rules": "规则",
        "Welcome message": "欢迎信息",
        "Wiki": "百科",
        "Events": "活动"
    };

    /**
     * 合并基础翻译表与用户自定义表，确保自定义优先。
     */
    const translationMap = { ...baseTranslationMap, ...userTranslationMap };

    /**
     * 开启后会在控制台记录缺失的英文词条，方便复制添加。
     * 设为 true，刷新 Reddit，然后在开发者工具中查看 "[Reddit CN][MISSING]" 日志。
     */
    const enableDebugLogging = false;

    /**
     * 记录已报告的缺失词条，避免重复日志。
     */
    const missingLogSet = new Set();

    /**
     * translationMap 的小写索引版，用于不区分大小写的匹配。
     */
    const translationMapLower = Object.fromEntries(
        Object.entries(translationMap).map(([key, value]) => [key.toLowerCase(), value])
    );

    /**
     * 针对包含数字或变动单位的文本进行部分翻译的规则。
     */
    const partialTranslationRules = [
        { regex: /(\d+(?:\.\d+)?k?)\s+comment(s)?/gi, replacement: "$1 条评论" },
        { regex: /(\d+(?:\.\d+)?k?)\s+upvote(s)?/gi, replacement: "$1 次赞成" },
        { regex: /(\d+(?:\.\d+)?k?)\s+downvote(s)?/gi, replacement: "$1 次反对" },
        { regex: /(\d+(?:\.\d+)?k?)\s+point(s)?/gi, replacement: "$1 分" },
        { regex: /(\d+(?:\.\d+)?k?)\s+member(s)?/gi, replacement: "$1 名成员" },
        { regex: /(\d+(?:\.\d+)?k?)\s+online/gi, replacement: "$1 人在线" },
        { regex: /(\d+(?:\.\d+)?k?)\s+post(s)?/gi, replacement: "$1 篇帖子" },
        { regex: /(\d+(?:\.\d+)?k?)\s+award(s)?/gi, replacement: "$1 个奖励" },
        { regex: /(\d+(?:\.\d+)?k?)\s+reader(s)?/gi, replacement: "$1 名读者" },
        { regex: /(\d+(?:\.\d+)?k?)\s+view(s)?/gi, replacement: "$1 次浏览" },
        { regex: /(\d+(?:\.\d+)?k?)\s+reply/gi, replacement: "$1 条回复" },
        { regex: /(\d+(?:\.\d+)?k?)\s+message(s)?/gi, replacement: "$1 条消息" },
        { regex: /(\d+(?:\.\d+)?k?)\s+result(s)?/gi, replacement: "$1 条结果" },
        { regex: /(\d+(?:\.\d+)?k?)\s+follower(s)?/gi, replacement: "$1 名关注者" },
        { regex: /(\d+(?:\.\d+)?k?)\s+following/gi, replacement: "$1 正在关注" },
        { regex: /(\d+(?:\.\d+)?k?)\s+karma/gi, replacement: "$1 业力" },
        { regex: /(\d+(?:\.\d+)?k?)\s+coin(s)?/gi, replacement: "$1 枚硬币" },
        { regex: /\b(\d+)\s+second(s)?\s+ago\b/gi, replacement: "$1 秒前" },
        { regex: /\b(\d+)\s+minute(s)?\s+ago\b/gi, replacement: "$1 分钟前" },
        { regex: /\b(\d+)\s+hour(s)?\s+ago\b/gi, replacement: "$1 小时前" },
        { regex: /\b(\d+)\s+day(s)?\s+ago\b/gi, replacement: "$1 天前" },
        { regex: /\b(\d+)\s+month(s)?\s+ago\b/gi, replacement: "$1 月前" },
        { regex: /\b(\d+)\s+year(s)?\s+ago\b/gi, replacement: "$1 年前" },
        { regex: /\bjust now\b/gi, replacement: "刚刚" },
        { regex: /\bnow\b/gi, replacement: "刚刚" },
        { regex: /\bin queue\b/gi, replacement: "排队中" },
        { regex: /\bstart chat\b/gi, replacement: "开始聊天" }
    ];

    /**
     * 词级替换，用于捕捉简短的独立词汇。
     */
    const wordReplacements = {
        ago: "前",
        minute: "分钟",
        minutes: "分钟",
        hour: "小时",
        hours: "小时",
        day: "天",
        days: "天",
        month: "月",
        months: "月",
        year: "年",
        years: "年",
        join: "加入",
        joined: "已加入",
        "See more": "查看更多",
        "See Less": "收起",
        Mute: "静音"
    };

    const wordBoundaryRegexps = Object.entries(wordReplacements).map(([key, value]) => ({
        regex: new RegExp("\\b" + escapeRegExp(key) + "\\b", "gi"),
        replacement: value
    }));

    /**
     * 转义字符串中的正则特殊字符。
     */
    function escapeRegExp(text) {
        return text.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
    }

    /**
     * 判断文本节点是否应跳过（如脚本、可编辑区域、代码块等）。
     */
    function shouldIgnoreNode(node) {
        const parent = node.parentElement;
        if (!parent) return false;
        const tagName = parent.tagName;
        if (tagName === "SCRIPT" || tagName === "STYLE" || tagName === "NOSCRIPT" || tagName === "CODE" || tagName === "PRE") {
            return true;
        }
        if (parent.isContentEditable) return true;
        return false;
    }

    /**
     * 对文本节点执行完整匹配翻译或部分替换。
     */
    function translateTextNode(node) {
        const original = node.nodeValue;
        if (!original) return;
        const trimmed = original.trim();
        if (!trimmed || trimmed.length > 200) return;
        if (!/[A-Za-z]/.test(trimmed)) return;

        const directMatch = translationMap[trimmed];
        if (directMatch) {
            node.nodeValue = original.replace(trimmed, directMatch);
            return;
        }

        const caseInsensitiveMatch = translationMapLower[trimmed.toLowerCase()];
        if (caseInsensitiveMatch) {
            node.nodeValue = caseInsensitiveMatch;
            return;
        }

        let translated = original;
        partialTranslationRules.forEach(({ regex, replacement }) => {
            translated = translated.replace(regex, replacement);
        });

        wordBoundaryRegexps.forEach(({ regex, replacement }) => {
            translated = translated.replace(regex, replacement);
        });

        // 回退到忽略前后空白与大小写的查找
        if (translated === original) {
            if (translationMap[trimmed]) {
                translated = translationMap[trimmed];
            } else {
                const fallbackCaseInsensitive = translationMapLower[trimmed.toLowerCase()];
                if (fallbackCaseInsensitive) {
                    translated = fallbackCaseInsensitive;
                }
            }
        }

        if (translated !== original) {
            node.nodeValue = translated;
        } else {
            logMissing(trimmed);
        }
    }

    /**
     * 在启用调试日志时记录缺失的翻译词条。
     */
    function logMissing(text) {
        if (!enableDebugLogging) return;
        if (missingLogSet.has(text)) return;
        missingLogSet.add(text);
        console.info("[Reddit CN][MISSING]", text);
    }

    /**
     * 翻译指定根节点下的所有文本节点。
     */
    function translateNode(root) {
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    if (shouldIgnoreNode(node)) return NodeFilter.FILTER_REJECT;
                    if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let current;
        while ((current = walker.nextNode())) {
            translateTextNode(current);
        }
    }

    /**
     * 记录已监视的根节点，避免重复挂载 MutationObserver。
     */
    const observedRoots = new WeakSet();

    /**
     * 翻译节点并递归处理其中的 shadow root。
     */
    function translateNodeWithShadows(root) {
        translateNode(root);

        if (root.querySelectorAll) {
            root.querySelectorAll("*").forEach((el) => {
                if (el.shadowRoot) {
                    translateNode(el.shadowRoot);
                    observeRoot(el.shadowRoot);
                }
            });
        }

        if (root.shadowRoot) {
            translateNode(root.shadowRoot);
            observeRoot(root.shadowRoot);
        }
    }

    /**
     * 在指定根节点上初始化 MutationObserver，翻译新增节点（包含 shadow DOM）。
     */
    function observeRoot(root) {
        if (!root || observedRoots.has(root)) return;

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === "characterData" && mutation.target.nodeType === Node.TEXT_NODE) {
                    translateTextNode(mutation.target);
                }

                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        translateTextNode(node);
                        return;
                    }

                    translateNodeWithShadows(node);
                });
            }
        });

        observer.observe(root, { childList: true, subtree: true, characterData: true });
        observedRoots.add(root);
    }

    /**
     * 入口：翻译现有内容并监听后续变更。
     */
    function startTranslation() {
        if (!document.body) {
            requestAnimationFrame(startTranslation);
            return;
        }

        translateNodeWithShadows(document.body);
        observeRoot(document.body);
    }

    startTranslation();
})();
