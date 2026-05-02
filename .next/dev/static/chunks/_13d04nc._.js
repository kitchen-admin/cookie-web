(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/text-3d-flip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Text3DFlip",
    ()=>Text3DFlip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Text3DFlip — timed keyword carousel with Magic-style slab geometry (see magicui.design).
 *
 * Layout / motion notes (from CSS 3D + Motion behaviour):
 * - Rotating around X inside a perspective parent moves the projected text vertically — that's
 *   parallax from perspective, not just “springs”.
 * - Remounting flip nodes each phrase resets transforms and exaggerates pops; pivots stay stable
 *   per word slot (`key={wi}`).
 * - Springs can still subtly overshoot string transform targets — tweens stop at exact end values.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/animation/hooks/use-animate.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const ROTATION_MAP = {
    top: "rotateX(90deg)",
    right: "rotateY(90deg)",
    bottom: "rotateX(-90deg)",
    left: "rotateY(-90deg)"
};
const SECOND_FACE_TRANSFORMS = {
    top: "rotateX(-90deg) translateZ(0.5lh)",
    right: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)",
    bottom: "rotateX(90deg) translateZ(0.5lh)",
    left: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)"
};
const FRONT_FACE_TRANSFORMS = {
    top: "translateZ(0.5lh)",
    bottom: "translateZ(0.5lh)",
    left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
    right: "rotateY(-90deg) translateX(50%) rotateY(90deg)"
};
const CONTAINER_TRANSFORMS = {
    top: "translateZ(-0.5lh)",
    bottom: "translateZ(-0.5lh)",
    left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
    right: "rotateY(90deg) translateX(50%) rotateY(-90deg)"
};
/** Tweens hit exact endpoints (no physics overshoot on transform strings). */ const FLIP_TWEEN = {
    type: "tween",
    duration: 0.4,
    ease: [
        0.33,
        0,
        0.17,
        1
    ]
};
const DEFAULT_DWELL_MS = 4800;
const MIN_WIDTH_SLOP_PX = 12;
function splitWords(phrase) {
    if (!phrase.trim()) return [];
    const parts = phrase.split(" ");
    return parts.map((text, index)=>({
            text,
            needsSpaceAfter: index < parts.length - 1
        }));
}
function collectFlipRoots(root) {
    if (!root) return [];
    return [
        ...root.querySelectorAll(".text-3d-flip-char")
    ];
}
function sleep(ms) {
    return new Promise((r)=>{
        window.setTimeout(r, ms);
    });
}
const Text3DFlip = ({ keywords, flipIntervalMs = DEFAULT_DWELL_MS, staggerDuration = 0.065, staggerFrom = "first", as: ElementTag = "p", className, textClassName, flipTextClassName, transition = FLIP_TWEEN, rotateDirection = "right", style, ...props })=>{
    _s();
    const [scopeRef, scopeAnimate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimate"])();
    const cancelledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const runningRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const keywordsLenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(keywords.length);
    keywordsLenRef.current = keywords.length;
    const safeLen = Math.max(keywords.length, 1);
    const cycleEnabled = keywords.length >= 2;
    const [phraseIndex, setPhraseIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const text = keywords[phraseIndex % safeLen] ?? "";
    const wordSlots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Text3DFlip.useMemo[wordSlots]": ()=>splitWords(text)
    }["Text3DFlip.useMemo[wordSlots]"], [
        text
    ]);
    const totalTiles = wordSlots.length;
    const getStaggerDelay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Text3DFlip.useCallback[getStaggerDelay]": (tileIndex, totalTiles_)=>{
            if (staggerFrom === "first") return tileIndex * staggerDuration;
            if (staggerFrom === "last") return (totalTiles_ - 1 - tileIndex) * staggerDuration;
            if (staggerFrom === "center") {
                const center = Math.floor(totalTiles_ / 2);
                return Math.abs(center - tileIndex) * staggerDuration;
            }
            if (staggerFrom === "random") {
                const randomIndex = Math.floor(Math.random() * totalTiles_);
                return Math.abs(randomIndex - tileIndex) * staggerDuration;
            }
            return Math.abs(staggerFrom - tileIndex) * staggerDuration;
        }
    }["Text3DFlip.useCallback[getStaggerDelay]"], [
        staggerFrom,
        staggerDuration
    ]);
    const keywordsFingerprint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Text3DFlip.useMemo[keywordsFingerprint]": ()=>[
                ...keywords
            ].join("\u037e")
    }["Text3DFlip.useMemo[keywordsFingerprint]"], [
        keywords
    ]);
    const transitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(transition);
    transitionRef.current = transition;
    const rotationTransform = ROTATION_MAP[rotateDirection];
    const probeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [reservedMinPx, setReservedMinPx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const remeasureWidths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Text3DFlip.useCallback[remeasureWidths]": ()=>{
            const probe = probeRef.current;
            if (!probe) return;
            let max = 0;
            for (const phrase of keywords){
                if (!phrase.trim()) continue;
                probe.textContent = phrase;
                max = Math.max(max, probe.offsetWidth);
            }
            probe.textContent = "";
            setReservedMinPx(Math.ceil(max + MIN_WIDTH_SLOP_PX));
        }
    }["Text3DFlip.useCallback[remeasureWidths]"], [
        keywords
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Text3DFlip.useLayoutEffect": ()=>{
            remeasureWidths();
        }
    }["Text3DFlip.useLayoutEffect"], [
        remeasureWidths,
        className,
        textClassName,
        keywordsFingerprint
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Text3DFlip.useEffect": ()=>{
            if (typeof document === "undefined") return undefined;
            const fonts = document.fonts;
            if (!fonts?.ready) return undefined;
            let cancelled = false;
            void fonts.ready.then({
                "Text3DFlip.useEffect": ()=>{
                    if (!cancelled) remeasureWidths();
                }
            }["Text3DFlip.useEffect"]);
            return ({
                "Text3DFlip.useEffect": ()=>{
                    cancelled = true;
                }
            })["Text3DFlip.useEffect"];
        }
    }["Text3DFlip.useEffect"], [
        remeasureWidths
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Text3DFlip.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const onResize = {
                "Text3DFlip.useEffect.onResize": ()=>{
                    remeasureWidths();
                }
            }["Text3DFlip.useEffect.onResize"];
            window.addEventListener("resize", onResize, {
                passive: true
            });
            return ({
                "Text3DFlip.useEffect": ()=>window.removeEventListener("resize", onResize)
            })["Text3DFlip.useEffect"];
        }
    }["Text3DFlip.useEffect"], [
        remeasureWidths
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Text3DFlip.useEffect": ()=>{
            cancelledRef.current = false;
            if (!cycleEnabled || totalTiles === 0) return undefined;
            async function loop() {
                while(!cancelledRef.current && keywordsLenRef.current >= 2){
                    await sleep(Math.max(flipIntervalMs, 1800));
                    if (cancelledRef.current || runningRef.current) continue;
                    const root = scopeRef.current;
                    const pivotsOut = collectFlipRoots(root);
                    if (pivotsOut.length === 0) continue;
                    runningRef.current = true;
                    try {
                        const tg = pivotsOut.length;
                        const delays = Array.from({
                            length: tg
                        }, {
                            "Text3DFlip.useEffect.loop.delays": (_, i)=>getStaggerDelay(i, tg)
                        }["Text3DFlip.useEffect.loop.delays"]);
                        const t = transitionRef.current;
                        await Promise.all(pivotsOut.map({
                            "Text3DFlip.useEffect.loop": (el, i)=>scopeAnimate(el, {
                                    transform: rotationTransform
                                }, {
                                    ...t,
                                    delay: delays[i] ?? 0
                                })
                        }["Text3DFlip.useEffect.loop"]));
                        if (cancelledRef.current) return;
                        // Edge-on → swap phrase (stable pivots preserve Motion transform at ~90deg)
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"])({
                            "Text3DFlip.useEffect.loop": ()=>{
                                const L = keywordsLenRef.current || 1;
                                setPhraseIndex({
                                    "Text3DFlip.useEffect.loop": (i)=>(i + 1) % L
                                }["Text3DFlip.useEffect.loop"]);
                            }
                        }["Text3DFlip.useEffect.loop"]);
                        if (cancelledRef.current) return;
                        const pivotsIn = collectFlipRoots(scopeRef.current);
                        if (pivotsIn.length === 0) continue;
                        await Promise.all(pivotsIn.map({
                            "Text3DFlip.useEffect.loop": (el, i)=>scopeAnimate(el, {
                                    transform: "rotateX(0deg) rotateY(0deg)"
                                }, {
                                    ...t,
                                    delay: delays[i] ?? 0
                                })
                        }["Text3DFlip.useEffect.loop"]));
                    } finally{
                        runningRef.current = false;
                    }
                }
            }
            void loop();
            return ({
                "Text3DFlip.useEffect": ()=>{
                    cancelledRef.current = true;
                }
            })["Text3DFlip.useEffect"];
        }
    }["Text3DFlip.useEffect"], [
        cycleEnabled,
        flipIntervalMs,
        getStaggerDelay,
        keywordsFingerprint,
        rotationTransform,
        totalTiles
    ]);
    if (keywords.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: probeRef,
                "aria-hidden": "true",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none fixed left-[-10000px] top-0 z-[-1] inline-block whitespace-nowrap", className, textClassName)
            }, void 0, false, {
                fileName: "[project]/components/ui/text-3d-flip.tsx",
                lineNumber: 281,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ElementTag, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex max-w-max flex-nowrap shrink-0 items-center whitespace-nowrap align-middle", className),
                ...props,
                style: {
                    ...style,
                    minWidth: reservedMinPx > 0 ? `${reservedMinPx}px` : undefined
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/components/ui/text-3d-flip.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        ref: scopeRef,
                        className: "relative inline-flex flex-nowrap items-center gap-0 perspective-[960px] perspective-origin-[50%_0%] transform-3d",
                        children: wordSlots.map((slot, wi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WordFlipTile, {
                                        word: slot.text,
                                        rotateDirection: rotateDirection,
                                        textClassName: textClassName,
                                        flipTextClassName: flipTextClassName
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/text-3d-flip.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    slot.needsSpaceAfter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "shrink-0 whitespace-pre",
                                        children: " "
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/text-3d-flip.tsx",
                                        lineNumber: 318,
                                        columnNumber: 40
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, `w-${wi}`, true, {
                                fileName: "[project]/components/ui/text-3d-flip.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/components/ui/text-3d-flip.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/text-3d-flip.tsx",
                lineNumber: 290,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(Text3DFlip, "0QVj3drjPa9Ecl4CsDZL4c+VV3w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimate"]
    ];
});
_c = Text3DFlip;
const WordFlipTile = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(({ word, textClassName, flipTextClassName, rotateDirection })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-3d-flip-char inline-block shrink-0 self-center origin-center transform-3d will-change-transform",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "relative inline-block origin-center transform-3d",
            style: {
                transform: CONTAINER_TRANSFORMS[rotateDirection]
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative block w-max whitespace-pre text-left font-[inherit] h-lh backface-hidden", textClassName),
                    style: {
                        WebkitFontSmoothing: "antialiased",
                        transform: FRONT_FACE_TRANSFORMS[rotateDirection]
                    },
                    children: word
                }, void 0, false, {
                    fileName: "[project]/components/ui/text-3d-flip.tsx",
                    lineNumber: 348,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    "aria-hidden": "true",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none absolute left-0 top-0 block w-max whitespace-pre text-left font-[inherit] h-lh backface-hidden", flipTextClassName),
                    style: {
                        WebkitFontSmoothing: "antialiased",
                        transform: SECOND_FACE_TRANSFORMS[rotateDirection]
                    },
                    children: word
                }, void 0, false, {
                    fileName: "[project]/components/ui/text-3d-flip.tsx",
                    lineNumber: 360,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/text-3d-flip.tsx",
            lineNumber: 344,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/text-3d-flip.tsx",
        lineNumber: 341,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = WordFlipTile;
WordFlipTile.displayName = "WordFlipTile";
Text3DFlip.displayName = "Text3DFlip";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Text3DFlip");
__turbopack_context__.k.register(_c1, "WordFlipTile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/WaitlistForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WaitlistForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Reusable waitlist form used in both the Hero and the CTA section.
// On success it calls onSuccess() — the parent opens the modal.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzOHx3tnmxrKcNx1Lhc0Ok9CrGztqwjOtegKO375HqQgzprlWF9icPi2sEDp4tBaEwqOQ/exec";
function WaitlistForm({ onSuccess, variant = "light" }) {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Basic email format check
    const isValidEmail = (value)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // Validate before sending
        if (!email || !isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            await fetch(WEB_APP_URL, {
                method: "POST",
                body: new URLSearchParams({
                    email
                })
            });
            onSuccess(); // trigger modal in parent
            setEmail(""); // clear the input
        } catch (err) {
            console.error("Waitlist submission error:", err);
            setError("An error occurred. Please try again later.");
        } finally{
            setLoading(false);
        }
    };
    // ── Light variant (hero section) ──────────────────────────────────────────
    if (variant === "light") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-2 w-full max-w-[440px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    noValidate: true,
                    className: "waitlist-form relative flex items-center w-full h-14 bg-white border-2 border-orange-900/15 rounded-full transition-[border-color,box-shadow] duration-200 focus-within:border-emerald-700 focus-within:shadow-[0_0_0_4px_rgba(0,0,0,0.08)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "email",
                            value: email,
                            onChange: (e)=>setEmail(e.target.value),
                            className: "waitlist-input flex-1 h-full px-5 font-sans text-base font-normal text-text-primary bg-transparent outline-none placeholder:text-text-tertiary",
                            placeholder: "your@email.com",
                            "aria-label": "Email address",
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/components/ui/WaitlistForm.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "waitlist-btn bg-linear-to-r from-emerald-600 to-emerald-800 h-11 mr-1 px-5 rounded-full font-sans text-base font-semibold text-white border-0 cursor-pointer flex items-center shrink-0 select-none active:scale-[0.97] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: loading ? "Submitting…" : "Join Waitlist"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/WaitlistForm.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/WaitlistForm.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/WaitlistForm.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-orange-600 text-sm pl-4",
                    role: "alert",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/ui/WaitlistForm.tsx",
                    lineNumber: 81,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/WaitlistForm.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this);
    }
    // ── Dark variant (CTA section) ────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2 w-full max-w-[440px] mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                noValidate: true,
                className: "waitlist-form waitlist-form--dark relative flex flex-col gap-2.5 w-full sm:flex-row sm:gap-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "email",
                        value: email,
                        onChange: (e)=>setEmail(e.target.value),
                        className: "waitlist-input waitlist-input-joined w-full px-5 py-3.5 border-2 border-white/20 rounded-xl font-sans text-base font-normal text-white bg-white/8 outline-none transition-[border-color,box-shadow,background] duration-200 focus:border-emerald-400 focus:bg-white/12 focus:shadow-[0_0_0_3px_rgba(52,211,153,0.25)] placeholder:text-white/40",
                        placeholder: "your@email.com",
                        "aria-label": "Email address",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/components/ui/WaitlistForm.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        className: "waitlist-btn waitlist-btn-joined relative overflow-hidden text-white font-sans text-base font-bold px-7 py-3.5 border-0 rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(4,120,87,0.4)] transition-[transform,box-shadow] duration-200 ease-out hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(4,120,87,0.55)] disabled:opacity-70 disabled:cursor-not-allowed bg-linear-to-r from-emerald-600 to-emerald-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: loading ? "Submitting…" : "Join the waitlist"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/WaitlistForm.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block transition-transform duration-200 ease-out",
                                "aria-hidden": "true",
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/WaitlistForm.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/WaitlistForm.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/WaitlistForm.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-400 text-sm text-center",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/ui/WaitlistForm.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/WaitlistForm.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_s(WaitlistForm, "muSjTRcehwzSfMTWb/qcZs+qYq8=");
_c = WaitlistForm;
var _c;
__turbopack_context__.k.register(_c, "WaitlistForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function Header() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "relative z-10 flex flex-col gap-4 px-6 pt-8 pb-4 md:flex-row md:items-center md:justify-between md:pt-10 md:px-12 xl:px-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-extrabold text-orange-900 tracking-tight leading-none",
                    children: "Cookie Kitchen"
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/Header.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex items-center gap-2 flex-wrap",
                "aria-label": "Navigation",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#journey",
                        className: "text-sm font-normal text-text-tertiary transition-colors duration-150 hover:text-text-primary hover:underline",
                        children: "How It Works"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-text-tertiary opacity-70 select-none",
                        "aria-hidden": "true",
                        children: "›"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#pillars",
                        className: "text-sm font-normal text-text-tertiary transition-colors duration-150 hover:text-text-primary hover:underline",
                        children: "Features"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-text-tertiary opacity-70 select-none",
                        "aria-hidden": "true",
                        children: "›"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#waitlist",
                        className: "gradient-text-brand text-sm font-bold hover:no-underline hover:opacity-80",
                        children: "Join Waitlist"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/Header.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/Header.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/sections/Hero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Keywords cycle via Text3DFlip (Magic-style staggered letters, then phrase advance).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$text$2d$3d$2d$flip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/text-3d-flip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$WaitlistForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/WaitlistForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/Header.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const KEYWORD_ROTATE_INTERVAL_MS = 5200;
const KEYWORDS = [
    "losing weight",
    "building strength",
    "eating healthier",
    "staying fit",
    "feeling great"
];
function Hero({ onWaitlistSuccess }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page relative min-h-svh flex flex-col overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/sections/Hero.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "relative z-10 flex-1 flex flex-col items-center gap-10 px-6 pt-6 md:flex-row md:items-center md:justify-between md:gap-16 md:pb-10 md:px-12 xl:px-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-start max-w-[640px] md:flex-1 md:max-w-[600px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-[clamp(2.4rem,7vw,4.5rem)] font-extrabold text-orange-900 leading-[1.08] tracking-[-0.03em] mb-6 pb-1",
                                children: [
                                    "Your goals.",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/components/sections/Hero.tsx",
                                        lineNumber: 39,
                                        columnNumber: 24
                                    }, this),
                                    "A smarter path",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/components/sections/Hero.tsx",
                                        lineNumber: 40,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex min-h-lh flex-nowrap items-center gap-x-[0.22em] whitespace-nowrap align-middle",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline shrink-0",
                                                children: "to"
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/Hero.tsx",
                                                lineNumber: 42,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$text$2d$3d$2d$flip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text3DFlip"], {
                                                as: "span",
                                                className: "inline-flex shrink-0 rounded-[3px] bg-amber-50 px-1.5 py-px",
                                                keywords: KEYWORDS,
                                                flipIntervalMs: KEYWORD_ROTATE_INTERVAL_MS,
                                                staggerDuration: 0.065,
                                                staggerFrom: "first",
                                                textClassName: "text-orange-600",
                                                flipTextClassName: "text-orange-500",
                                                rotateDirection: "top"
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/Hero.tsx",
                                                lineNumber: 47,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/sections/Hero.tsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/sections/Hero.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[clamp(1rem,2vw,1.125rem)] font-normal text-text-secondary leading-[1.8] mb-10 max-w-[480px]",
                                children: "Cookie Kitchen is a new kind of health companion — one that adapts to your lifestyle, understands your kitchen, and builds a plan you'll actually follow. No rigid diets. No obsessive logging."
                            }, void 0, false, {
                                fileName: "[project]/components/sections/Hero.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$WaitlistForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onSuccess: onWaitlistSuccess,
                                variant: "light"
                            }, void 0, false, {
                                fileName: "[project]/components/sections/Hero.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/sections/Hero.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                        className: "relative w-full max-w-[540px] self-center md:flex-[0_0_45%] md:max-w-[520px] drop-shadow-[0_20px_50px_rgba(234,88,12,0.2)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/mascot.png",
                                alt: "Cookie Kitchen — your intelligent health companion",
                                width: 520,
                                height: 520,
                                priority: true,
                                className: "w-full h-auto"
                            }, void 0, false, {
                                fileName: "[project]/components/sections/Hero.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 rounded-2xl overflow-hidden pointer-events-none",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "scan-line"
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Hero.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "scan-grid"
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Hero.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "scan-corner scan-corner-tl"
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/Hero.tsx",
                                                lineNumber: 90,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "scan-corner scan-corner-tr"
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/Hero.tsx",
                                                lineNumber: 91,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "scan-corner scan-corner-bl"
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/Hero.tsx",
                                                lineNumber: 92,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "scan-corner scan-corner-br"
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/Hero.tsx",
                                                lineNumber: 93,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/sections/Hero.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/sections/Hero.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/sections/Hero.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/sections/Hero.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/sections/Hero.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = Hero;
var _c;
__turbopack_context__.k.register(_c, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/blur-fade.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlurFade",
    ()=>BlurFade
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const getFilter = (v)=>typeof v === "function" ? undefined : v.filter;
function BlurFade({ children, className, variant, duration = 0.4, delay = 0, offset = 6, direction = "down", inView = false, inViewMargin = "-50px", blur = "6px", ...props }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inViewResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: inViewMargin
    });
    const isInView = !inView || inViewResult;
    const defaultVariants = {
        hidden: {
            [direction === "left" || direction === "right" ? "x" : "y"]: direction === "right" || direction === "down" ? -offset : offset,
            opacity: 0,
            filter: `blur(${blur})`
        },
        visible: {
            [direction === "left" || direction === "right" ? "x" : "y"]: 0,
            opacity: 1,
            filter: `blur(0px)`
        }
    };
    const combinedVariants = variant ?? defaultVariants;
    const hiddenFilter = getFilter(combinedVariants.hidden);
    const visibleFilter = getFilter(combinedVariants.visible);
    const shouldTransitionFilter = hiddenFilter != null && visibleFilter != null && hiddenFilter !== visibleFilter;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            ref: ref,
            initial: "hidden",
            animate: isInView ? "visible" : "hidden",
            exit: "hidden",
            variants: combinedVariants,
            transition: {
                delay: 0.04 + delay,
                duration,
                ease: "easeOut",
                ...shouldTransitionFilter ? {
                    filter: {
                        duration
                    }
                } : {}
            },
            className: className,
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/components/ui/blur-fade.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/blur-fade.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(BlurFade, "Y9Cvw8SZUPeu+tLef+iN//IVVUc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = BlurFade;
var _c;
__turbopack_context__.k.register(_c, "BlurFade");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/sections/Promise.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Promise
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// "The Promise" section — introduces Cookie Kitchen's core idea
// Uses Magic UI BlurFade for the scroll-reveal animation
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$blur$2d$fade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/blur-fade.tsx [app-client] (ecmascript)");
;
;
function Promise() {
    const goals = [
        {
            emoji: "🎯",
            label: "Lose weight"
        },
        {
            emoji: "💪",
            label: "Build strength"
        },
        {
            emoji: "🥗",
            label: "Eat healthier"
        },
        {
            emoji: "🏃",
            label: "Stay fit"
        },
        {
            emoji: "✨",
            label: "Just explore"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-surface py-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[1120px] mx-auto px-6 sm:px-8 md:px-12 xl:px-16",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$blur$2d$fade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlurFade"], {
                delay: 0.1,
                className: "max-w-[760px] mx-auto text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-3",
                        children: "Meet Cookie Kitchen"
                    }, void 0, false, {
                        fileName: "[project]/components/sections/Promise.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-[clamp(2rem,5vw,3.2rem)] font-extrabold text-orange-900 leading-[1.15] tracking-tight mb-6",
                        children: [
                            "The health companion",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/sections/Promise.tsx",
                                lineNumber: 25,
                                columnNumber: 33
                            }, this),
                            "that actually",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                className: "not-italic gradient-text-brand",
                                children: "gets"
                            }, void 0, false, {
                                fileName: "[project]/components/sections/Promise.tsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this),
                            " you."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/sections/Promise.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[clamp(1rem,2vw,1.125rem)] font-normal text-text-secondary leading-[1.8] mb-10",
                        children: "Most apps track what you do. Cookie Kitchen understands who you are. Tell us your goal — lose weight, build strength, eat better, or simply explore new food. We learn your lifestyle, your preferences, your kitchen — and build a plan that's genuinely yours. One that evolves as you do. No rigid diets. No starting over."
                    }, void 0, false, {
                        fileName: "[project]/components/sections/Promise.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-center gap-[0.6rem]",
                        children: goals.map(({ emoji, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-[0.4rem] px-[1.1rem] py-2 rounded-full text-sm font-bold bg-white border border-orange-900/10 text-orange-900 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:translate-y-[-3px] hover:shadow-[0_6px_20px_rgba(124,45,18,0.08)] hover:border-orange-600/30",
                                children: [
                                    emoji,
                                    " ",
                                    label
                                ]
                            }, label, true, {
                                fileName: "[project]/components/sections/Promise.tsx",
                                lineNumber: 40,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/sections/Promise.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/sections/Promise.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/sections/Promise.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/sections/Promise.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = Promise;
var _c;
__turbopack_context__.k.register(_c, "Promise");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/sections/Journey.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Journey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// "How It Works" section — 4 steps with connectors between them
// BlurFade staggers each step as the user scrolls down
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$blur$2d$fade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/blur-fade.tsx [app-client] (ecmascript)");
;
;
const steps = [
    {
        number: "01",
        emoji: "🎯",
        title: "Set your goal",
        description: "Tell us what you want — lose weight, gain muscle, eat cleaner, or just discover new meals. No goal is too big or too small."
    },
    {
        number: "02",
        emoji: "🧬",
        title: "Tell us about you",
        description: "We learn your lifestyle — diet type, allergies, activity level, daily habits — so every recommendation is uniquely yours."
    },
    {
        number: "03",
        emoji: "🧠",
        title: "We build your plan",
        description: "A personalised meal plan, activity guide, and smart grocery list — all calibrated to your goal. Adjusted as life changes, not set in stone."
    },
    {
        number: "04",
        emoji: "📈",
        title: "Track and evolve",
        description: "Your progress updates in real time. The plan adapts when you need it to. You see exactly where you are versus where you want to be."
    }
];
function Journey() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-surface-alt py-24",
        id: "journey",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[1120px] mx-auto px-6 sm:px-8 md:px-12 xl:px-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$blur$2d$fade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlurFade"], {
                    delay: 0.1,
                    className: "text-center mb-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-block text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-3",
                            children: "How it works"
                        }, void 0, false, {
                            fileName: "[project]/components/sections/Journey.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold text-orange-900 leading-[1.15] tracking-tight text-center mb-4",
                            children: "Your journey, step by step"
                        }, void 0, false, {
                            fileName: "[project]/components/sections/Journey.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-base font-normal text-text-secondary leading-[1.7] mb-10 max-w-[560px] mx-auto",
                            children: "From your first goal to your last milestone — we're with you every step of the way."
                        }, void 0, false, {
                            fileName: "[project]/components/sections/Journey.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/sections/Journey.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center sm:flex-row sm:items-start sm:justify-center sm:flex-wrap sm:gap-0 xl:flex-nowrap",
                    children: steps.map((step, i)=>// React.Fragment lets us output both the card + the connector
                        // without adding an extra wrapping div
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "contents",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$blur$2d$fade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlurFade"], {
                                    delay: 0.15 + i * 0.1,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-amber-50 rounded-4xl p-10 max-w-[280px] text-center relative transition-[transform,box-shadow] duration-300 ease-out hover:translate-y-[-4px] hover:shadow-[0_16px_40px_rgba(124,45,18,0.08)] sm:max-w-[220px] xl:max-w-[260px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-extrabold tracking-[0.12em] text-orange-600 uppercase mb-3",
                                                children: step.number
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/Journey.tsx",
                                                lineNumber: 65,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[2.5rem] leading-none mb-4",
                                                children: step.emoji
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/Journey.tsx",
                                                lineNumber: 68,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-extrabold text-orange-900 mb-2 tracking-tight",
                                                children: step.title
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/Journey.tsx",
                                                lineNumber: 69,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-normal text-text-secondary leading-[1.7]",
                                                children: step.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/Journey.tsx",
                                                lineNumber: 72,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/sections/Journey.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/sections/Journey.tsx",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, this),
                                i < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-px h-10 bg-linear-to-b from-orange-600 to-transparent rounded-full opacity-30 shrink-0 sm:w-12 sm:h-px sm:mt-20 sm:self-auto sm:bg-linear-to-r",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/components/sections/Journey.tsx",
                                    lineNumber: 80,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, step.number, true, {
                            fileName: "[project]/components/sections/Journey.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/sections/Journey.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/sections/Journey.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/sections/Journey.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c = Journey;
var _c;
__turbopack_context__.k.register(_c, "Journey");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/magic-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MagicCard",
    ()=>MagicCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$template$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-template.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function isOrbMode(props) {
    return props.mode === "orb";
}
function MagicCard(props) {
    _s();
    const { children, className, gradientSize = 200, gradientColor = "#262626", gradientOpacity = 0.8, gradientFrom = "#9E7AFF", gradientTo = "#FE8BBB", mode = "gradient" } = props;
    const glowFrom = isOrbMode(props) ? props.glowFrom ?? "#ee4f27" : "#ee4f27";
    const glowTo = isOrbMode(props) ? props.glowTo ?? "#6b21ef" : "#6b21ef";
    const glowAngle = isOrbMode(props) ? props.glowAngle ?? 90 : 90;
    const glowSize = isOrbMode(props) ? props.glowSize ?? 420 : 420;
    const glowBlur = isOrbMode(props) ? props.glowBlur ?? 60 : 60;
    const glowOpacity = isOrbMode(props) ? props.glowOpacity ?? 0.9 : 0.9;
    const { theme, systemTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MagicCard.useEffect": ()=>setMounted(true)
    }["MagicCard.useEffect"], []);
    const isDarkTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MagicCard.useMemo[isDarkTheme]": ()=>{
            if (!mounted) return true;
            const currentTheme = theme === "system" ? systemTheme : theme;
            return currentTheme === "dark";
        }
    }["MagicCard.useMemo[isDarkTheme]"], [
        theme,
        systemTheme,
        mounted
    ]);
    const mouseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(-gradientSize);
    const mouseY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(-gradientSize);
    const orbX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(mouseX, {
        stiffness: 250,
        damping: 30,
        mass: 0.6
    });
    const orbY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(mouseY, {
        stiffness: 250,
        damping: 30,
        mass: 0.6
    });
    const orbVisible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(0, {
        stiffness: 300,
        damping: 35
    });
    const modeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(mode);
    const glowOpacityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(glowOpacity);
    const gradientSizeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(gradientSize);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MagicCard.useEffect": ()=>{
            modeRef.current = mode;
        }
    }["MagicCard.useEffect"], [
        mode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MagicCard.useEffect": ()=>{
            glowOpacityRef.current = glowOpacity;
        }
    }["MagicCard.useEffect"], [
        glowOpacity
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MagicCard.useEffect": ()=>{
            gradientSizeRef.current = gradientSize;
        }
    }["MagicCard.useEffect"], [
        gradientSize
    ]);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MagicCard.useCallback[reset]": (reason = "leave")=>{
            const currentMode = modeRef.current;
            if (currentMode === "orb") {
                if (reason === "enter") orbVisible.set(glowOpacityRef.current);
                else orbVisible.set(0);
                return;
            }
            const off = -gradientSizeRef.current;
            mouseX.set(off);
            mouseY.set(off);
        }
    }["MagicCard.useCallback[reset]"], [
        mouseX,
        mouseY,
        orbVisible
    ]);
    const handlePointerMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MagicCard.useCallback[handlePointerMove]": (e)=>{
            const rect = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    }["MagicCard.useCallback[handlePointerMove]"], [
        mouseX,
        mouseY
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MagicCard.useEffect": ()=>{
            reset("init");
        }
    }["MagicCard.useEffect"], [
        reset
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MagicCard.useEffect": ()=>{
            const handleGlobalPointerOut = {
                "MagicCard.useEffect.handleGlobalPointerOut": (e)=>{
                    if (!e.relatedTarget) reset("global");
                }
            }["MagicCard.useEffect.handleGlobalPointerOut"];
            const handleBlur = {
                "MagicCard.useEffect.handleBlur": ()=>reset("global")
            }["MagicCard.useEffect.handleBlur"];
            const handleVisibility = {
                "MagicCard.useEffect.handleVisibility": ()=>{
                    if (document.visibilityState !== "visible") reset("global");
                }
            }["MagicCard.useEffect.handleVisibility"];
            window.addEventListener("pointerout", handleGlobalPointerOut);
            window.addEventListener("blur", handleBlur);
            document.addEventListener("visibilitychange", handleVisibility);
            return ({
                "MagicCard.useEffect": ()=>{
                    window.removeEventListener("pointerout", handleGlobalPointerOut);
                    window.removeEventListener("blur", handleBlur);
                    document.removeEventListener("visibilitychange", handleVisibility);
                }
            })["MagicCard.useEffect"];
        }
    }["MagicCard.useEffect"], [
        reset
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative isolate overflow-hidden rounded-[inherit] border border-transparent", className),
        onPointerMove: handlePointerMove,
        onPointerLeave: ()=>reset("leave"),
        onPointerEnter: ()=>reset("enter"),
        style: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$template$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionTemplate"]`
          linear-gradient(var(--color-background) 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            var(--color-border) 100%
          ) border-box
        `
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-background absolute inset-px z-20 rounded-[inherit]"
            }, void 0, false, {
                fileName: "[project]/components/ui/magic-card.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            mode === "gradient" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                suppressHydrationWarning: true,
                className: "pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                style: {
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$template$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionTemplate"]`
              radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                ${gradientColor},
                transparent 100%
              )
            `,
                    opacity: gradientOpacity
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/magic-card.tsx",
                lineNumber: 182,
                columnNumber: 9
            }, this),
            mode === "orb" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                suppressHydrationWarning: true,
                "aria-hidden": "true",
                className: "pointer-events-none absolute z-30",
                style: {
                    width: glowSize,
                    height: glowSize,
                    x: orbX,
                    y: orbY,
                    translateX: "-50%",
                    translateY: "-50%",
                    borderRadius: 9999,
                    filter: `blur(${glowBlur}px)`,
                    opacity: orbVisible,
                    background: `linear-gradient(${glowAngle}deg, ${glowFrom}, ${glowTo})`,
                    mixBlendMode: isDarkTheme ? "screen" : "multiply",
                    willChange: "transform, opacity"
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/magic-card.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-40",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/magic-card.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/magic-card.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_s(MagicCard, "D6/5d730/1+XOR8GMnv6VLX25k8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
_c = MagicCard;
var _c;
__turbopack_context__.k.register(_c, "MagicCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/sections/Pillars.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Pillars
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// "Four Pillars" feature cards section
// Uses Magic UI MagicCard for the interactive hover glow effect
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$blur$2d$fade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/blur-fade.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$magic$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/magic-card.tsx [app-client] (ecmascript)");
;
;
;
const cards = [
    {
        emoji: "🎯",
        badge: "Goal Intelligence",
        badgeStyle: "light",
        title: "A plan built around your reality",
        description: "Whether you want to lose 5 kg or run your first 5k, we map a realistic, achievable timeline — and honestly tell you when a goal needs adjusting.",
        dark: false
    },
    {
        emoji: "🍽️",
        badge: "Kitchen Wisdom",
        badgeStyle: "dark",
        title: "Your kitchen, always on your side",
        description: "We see what you have. We know what you need. Meals are crafted from your actual ingredients — with smart restocking before you even notice you're running low.",
        dark: true
    },
    {
        emoji: "⚡",
        badge: "Lifestyle Integration",
        badgeStyle: "light",
        title: "Fits your life, not the other way around",
        description: "Active or sedentary, vegan or omnivore — your plan starts where you are and builds from there. Timely reminders arrive exactly when they make sense for your day.",
        dark: false
    },
    {
        emoji: "📊",
        badge: "Progress Engine",
        badgeStyle: "light",
        title: "Track progress, not perfection",
        description: "See expected vs actual — meals, activity, nutrition. Ate out? No problem. The system adapts without punishment. Progress is always moving forward.",
        dark: false
    }
];
function Pillars() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-surface py-24",
        id: "pillars",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[1120px] mx-auto px-6 sm:px-8 md:px-12 xl:px-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$blur$2d$fade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlurFade"], {
                    delay: 0.1,
                    className: "text-center mb-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-block text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-3",
                            children: "What's inside"
                        }, void 0, false, {
                            fileName: "[project]/components/sections/Pillars.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold text-orange-900 leading-[1.15] tracking-tight text-center mb-4",
                            children: "Four pillars of your transformation"
                        }, void 0, false, {
                            fileName: "[project]/components/sections/Pillars.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-base font-normal text-text-secondary leading-[1.7] mb-10 max-w-[560px] mx-auto",
                            children: "Designed around how people actually live — not how they wish they did."
                        }, void 0, false, {
                            fileName: "[project]/components/sections/Pillars.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/sections/Pillars.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6",
                    children: cards.map((card, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$blur$2d$fade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlurFade"], {
                            delay: 0.15 + i * 0.1,
                            children: card.dark ? // ── Dark accent card ────────────────────────────────────────
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pillar-card-accent relative overflow-hidden bg-orange-900 rounded-4xl p-10 flex flex-col gap-[0.6rem] border border-transparent transition-[transform,box-shadow] duration-300 ease-out hover:translate-y-[-6px] hover:shadow-[0_24px_56px_rgba(124,45,18,0.2)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[2.25rem] leading-none mb-1",
                                        children: card.emoji
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Pillars.tsx",
                                        lineNumber: 71,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center self-start text-xs font-extrabold uppercase tracking-[0.06em] text-white/80 bg-white/12 px-[0.7rem] py-1 rounded-full",
                                        children: card.badge
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Pillars.tsx",
                                        lineNumber: 72,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-extrabold text-white leading-[1.15] tracking-tight",
                                        children: card.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Pillars.tsx",
                                        lineNumber: 75,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-base font-normal text-white/65 leading-[1.7] flex-1",
                                        children: card.description
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Pillars.tsx",
                                        lineNumber: 78,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center self-start text-xs font-extrabold tracking-[0.06em] uppercase text-white/85 bg-white/12 px-3 py-[0.3rem] rounded-full mt-2",
                                        children: "Launching soon"
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Pillars.tsx",
                                        lineNumber: 81,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/sections/Pillars.tsx",
                                lineNumber: 70,
                                columnNumber: 17
                            }, this) : // ── Light card with MagicCard glow ──────────────────────────
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$magic$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MagicCard"], {
                                className: "relative overflow-hidden bg-white rounded-4xl p-10 flex flex-col gap-[0.6rem] border border-transparent cursor-default",
                                gradientColor: "rgba(234,88,12,0.06)",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-[-40%] right-[-20%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.06)_0%,transparent_70%)] pointer-events-none",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Pillars.tsx",
                                        lineNumber: 92,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[2.25rem] leading-none mb-1",
                                        children: card.emoji
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Pillars.tsx",
                                        lineNumber: 96,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center self-start text-xs font-extrabold uppercase tracking-[0.06em] text-orange-600 bg-orange-600/10 px-[0.7rem] py-1 rounded-full",
                                        children: card.badge
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Pillars.tsx",
                                        lineNumber: 97,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-extrabold text-orange-900 leading-[1.15] tracking-tight",
                                        children: card.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Pillars.tsx",
                                        lineNumber: 100,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-base font-normal text-text-secondary leading-[1.7] flex-1",
                                        children: card.description
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Pillars.tsx",
                                        lineNumber: 103,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center self-start text-xs font-extrabold tracking-[0.06em] uppercase text-orange-900 bg-amber-50 px-3 py-[0.3rem] rounded-full mt-2",
                                        children: "Launching soon"
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/Pillars.tsx",
                                        lineNumber: 106,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/sections/Pillars.tsx",
                                lineNumber: 87,
                                columnNumber: 17
                            }, this)
                        }, card.badge, false, {
                            fileName: "[project]/components/sections/Pillars.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/sections/Pillars.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/sections/Pillars.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/sections/Pillars.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_c = Pillars;
var _c;
__turbopack_context__.k.register(_c, "Pillars");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/sections/FAQ.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FAQ
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// FAQ accordion section.
// useState replaces the old script.js max-height toggle logic.
// Only one item can be open at a time.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$blur$2d$fade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/blur-fade.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const faqs = [
    {
        q: "Do I need to count calories manually?",
        a: "No. Cookie Kitchen handles all nutrition tracking behind the scenes. You focus on cooking and enjoying food — we take care of the numbers."
    },
    {
        q: "Can I use it if I'm vegetarian, vegan, or have allergies?",
        a: "Absolutely. During setup you share your dietary preferences and any allergies. Every plan, every meal, every recommendation is filtered accordingly — always."
    },
    {
        q: "What if I eat out or order delivery?",
        a: "Life happens. Log it and we account for it — no streak resets, no guilt trips. The plan adapts and keeps you moving forward regardless."
    },
    {
        q: "Does it support both weight loss and muscle gain?",
        a: "Yes. Set your goal — cut, bulk, recomp, or maintain — and we build a meal and activity plan calibrated precisely to that outcome, with realistic timelines."
    },
    {
        q: "When is the app launching?",
        a: "We're rolling out to early access members first. Join the waitlist to secure your spot and be the first to know when we go live — spots are limited."
    }
];
function FAQ() {
    _s();
    // null means all items are closed
    const [openIndex, setOpenIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toggle = (index)=>{
        // clicking an open item closes it; clicking a new one opens it
        setOpenIndex(openIndex === index ? null : index);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-surface-alt py-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[1120px] mx-auto px-6 sm:px-8 md:px-12 xl:px-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$blur$2d$fade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlurFade"], {
                    delay: 0.1,
                    className: "text-center mb-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-block text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-3",
                            children: "Got questions?"
                        }, void 0, false, {
                            fileName: "[project]/components/sections/FAQ.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold text-orange-900 leading-[1.15] tracking-tight text-center mb-4",
                            children: "Frequently asked"
                        }, void 0, false, {
                            fileName: "[project]/components/sections/FAQ.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/sections/FAQ.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[740px] mx-auto flex flex-col gap-3",
                    children: faqs.map((item, i)=>{
                        const isOpen = openIndex === i;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$blur$2d$fade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlurFade"], {
                            delay: 0.15 + i * 0.08,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "faq-item bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(124,45,18,0.04)] transition-shadow duration-200 ease-out hover:shadow-[0_6px_20px_rgba(124,45,18,0.08)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>toggle(i),
                                        "aria-expanded": isOpen,
                                        className: "w-full bg-transparent border-0 font-sans text-base font-bold text-orange-900 text-left px-6 py-5 cursor-pointer flex items-center justify-between gap-4 transition-colors duration-150 ease-out hover:bg-orange-900/3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.q
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/FAQ.tsx",
                                                lineNumber: 71,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `shrink-0 text-[1.4rem] font-normal text-orange-600 transition-transform duration-300 ease-out leading-none ${isOpen ? "rotate-45" : ""}`,
                                                "aria-hidden": "true",
                                                children: "+"
                                            }, void 0, false, {
                                                fileName: "[project]/components/sections/FAQ.tsx",
                                                lineNumber: 73,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/sections/FAQ.tsx",
                                        lineNumber: 66,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "faq-item__a",
                                        style: {
                                            maxHeight: isOpen ? "500px" : "0px"
                                        },
                                        role: "region",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "px-6 pb-5 text-base font-normal text-text-secondary leading-[1.7]",
                                            children: item.a
                                        }, void 0, false, {
                                            fileName: "[project]/components/sections/FAQ.tsx",
                                            lineNumber: 89,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/sections/FAQ.tsx",
                                        lineNumber: 84,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/sections/FAQ.tsx",
                                lineNumber: 63,
                                columnNumber: 17
                            }, this)
                        }, item.q, false, {
                            fileName: "[project]/components/sections/FAQ.tsx",
                            lineNumber: 62,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/sections/FAQ.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/sections/FAQ.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/sections/FAQ.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(FAQ, "7z1SfW1ag/kVV/D8SOtFgmPOJ8o=");
_c = FAQ;
var _c;
__turbopack_context__.k.register(_c, "FAQ");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/meteors.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Meteors",
    ()=>Meteors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const Meteors = ({ number = 20, minDelay = 0.2, maxDelay = 1.2, minDuration = 2, maxDuration = 10, angle = 215, className })=>{
    _s();
    const [meteorStyles, setMeteorStyles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Meteors.useEffect": ()=>{
            const styles = [
                ...new Array(number)
            ].map({
                "Meteors.useEffect.styles": ()=>({
                        "--angle": -angle + "deg",
                        top: "-5%",
                        left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
                        animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
                        animationDuration: Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + "s"
                    })
            }["Meteors.useEffect.styles"]);
            setMeteorStyles(styles);
        }
    }["Meteors.useEffect"], [
        number,
        minDelay,
        maxDelay,
        minDuration,
        maxDuration,
        angle
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            ...meteorStyles
        ].map((style, idx)=>// Meteor Head
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    ...style
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]", className),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-zinc-500 to-transparent"
                }, void 0, false, {
                    fileName: "[project]/components/ui/meteors.tsx",
                    lineNumber: 56,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, idx, false, {
                fileName: "[project]/components/ui/meteors.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false);
};
_s(Meteors, "LgJ77fXlqleGhiFbXJwv5JjzZB0=");
_c = Meteors;
var _c;
__turbopack_context__.k.register(_c, "Meteors");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/sections/WaitlistCTA.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WaitlistCTA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// CTA section — dark background with the second waitlist form
// Uses Magic UI Meteors for a subtle background particle effect
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$meteors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/meteors.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$WaitlistForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/WaitlistForm.tsx [app-client] (ecmascript)");
;
;
;
function WaitlistCTA({ onWaitlistSuccess }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative overflow-hidden bg-orange-950 py-24 text-center",
        id: "waitlist",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cta-orb absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none blur-2xl",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/sections/WaitlistCTA.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$meteors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Meteors"], {
                number: 18
            }, void 0, false, {
                fileName: "[project]/components/sections/WaitlistCTA.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-[1120px] mx-auto px-6 sm:px-8 md:px-12 xl:px-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pulse-icon text-[3rem] block mb-6 leading-none",
                        children: "🚀"
                    }, void 0, false, {
                        fileName: "[project]/components/sections/WaitlistCTA.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white tracking-tight leading-[1.15] mb-3",
                        children: [
                            "Your goals deserve a",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/sections/WaitlistCTA.tsx",
                                lineNumber: 31,
                                columnNumber: 31
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "gradient-text-cta",
                                children: "smarter companion."
                            }, void 0, false, {
                                fileName: "[project]/components/sections/WaitlistCTA.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/sections/WaitlistCTA.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-base font-normal text-white/60 leading-[1.7] mb-10",
                        children: [
                            "Be among the first to experience Cookie Kitchen.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                className: "hidden sm:inline"
                            }, void 0, false, {
                                fileName: "[project]/components/sections/WaitlistCTA.tsx",
                                lineNumber: 35,
                                columnNumber: 59
                            }, this),
                            "Early access is limited — don't lose your spot."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/sections/WaitlistCTA.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$WaitlistForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onSuccess: onWaitlistSuccess,
                        variant: "dark"
                    }, void 0, false, {
                        fileName: "[project]/components/sections/WaitlistCTA.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/sections/WaitlistCTA.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/sections/WaitlistCTA.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = WaitlistCTA;
var _c;
__turbopack_context__.k.register(_c, "WaitlistCTA");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Footer — copyright + legal links on a dark background
__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-orange-950 border-t border-white/6 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[1120px] mx-auto px-6 sm:px-8 md:px-12 xl:px-16 flex flex-col gap-4 items-center text-center sm:flex-row sm:justify-between sm:text-left",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "block text-lg font-extrabold text-orange-600 mb-1",
                            children: "Cookie Kitchen"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Footer.tsx",
                            lineNumber: 9,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-normal text-white/30",
                            children: "© 2026 Cookie Kitchen. All rights reserved."
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Footer.tsx",
                            lineNumber: 12,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Footer.tsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex gap-6 flex-wrap justify-center",
                    "aria-label": "Footer legal",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/terms",
                            className: "text-sm font-normal text-white/45 transition-colors duration-150 hover:text-white",
                            children: "Terms & Conditions"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Footer.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/privacy",
                            className: "text-sm font-normal text-white/45 transition-colors duration-150 hover:text-white",
                            children: "Privacy Policy"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Footer.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Footer.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/layout/Footer.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/Footer.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/WaitlistModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WaitlistModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function WaitlistModal({ isOpen, onClose }) {
    // Close when clicking the dark backdrop (outside the modal box)
    const handleBackdropClick = (e)=>{
        if (e.target === e.currentTarget) onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `modal-overlay fixed inset-0 w-screen h-screen bg-black/50 flex items-center justify-center z-9999 backdrop-blur-xs ${isOpen ? "modal-overlay--active" : ""}`,
        "aria-hidden": !isOpen,
        onClick: handleBackdropClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-box relative bg-white px-6 py-16 rounded-4xl max-w-[400px] w-[90%] text-center shadow-[0_20px_48px_rgba(0,0,0,0.2)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-4 right-6 text-[2rem] leading-none bg-transparent border-0 cursor-pointer text-text-secondary transition-colors duration-200 ease-out hover:text-text-primary",
                    "aria-label": "Close modal",
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/components/ui/WaitlistModal.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[3.5rem] mb-4 leading-none",
                    children: "🎉"
                }, void 0, false, {
                    fileName: "[project]/components/ui/WaitlistModal.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-2xl font-extrabold text-orange-900 mb-2 tracking-tight",
                    children: "You're on the waitlist!"
                }, void 0, false, {
                    fileName: "[project]/components/ui/WaitlistModal.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-base font-normal text-text-secondary leading-normal",
                    children: "Keep an eye on your inbox. We'll be in touch soon."
                }, void 0, false, {
                    fileName: "[project]/components/ui/WaitlistModal.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/WaitlistModal.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/WaitlistModal.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = WaitlistModal;
var _c;
__turbopack_context__.k.register(_c, "WaitlistModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// app/page.tsx — the main landing page.
// Assembles every section top-to-bottom.
// useState controls the modal — when either form submits, isModalOpen = true.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$Hero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/sections/Hero.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$Promise$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/sections/Promise.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$Journey$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/sections/Journey.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$Pillars$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/sections/Pillars.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$FAQ$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/sections/FAQ.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$WaitlistCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/sections/WaitlistCTA.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$WaitlistModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/WaitlistModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function Home() {
    _s();
    // Shared modal state — passed down to both waitlist forms
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const openModal = ()=>setIsModalOpen(true);
    const closeModal = ()=>setIsModalOpen(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$Hero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onWaitlistSuccess: openModal
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$Promise$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$Journey$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$Pillars$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$FAQ$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sections$2f$WaitlistCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onWaitlistSuccess: openModal
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$WaitlistModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isModalOpen,
                onClose: closeModal
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Home, "mLsII5HRP5G63IA/8vjZ5YHXWr8=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_13d04nc._.js.map