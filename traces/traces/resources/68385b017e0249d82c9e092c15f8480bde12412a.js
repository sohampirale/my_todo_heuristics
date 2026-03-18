(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/seed.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"mode":"lite","home":{"ambiguous_cta":true,"modal_no_close":true},"auth":{"missing_labels":true,"cryptic_error":true},"tasks":{"no_confirm_delete":true,"small_hit_target":true},"task":{"save_affordance_confusing":true},"projects":{"icons_inconsistent":true,"hidden_controls":true},"calendar":{"no_spinner":true,"ambiguous_timepicker":true},"search":{"filters_reset":true,"missing_no_results_help":true},"settings":{"destructive_toggle_no_warn":true,"ambiguous_toggle_labels":true},"onboarding":{"skip_too_easy":true}});}),
"[project]/src/lib/seeds.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllSeeds",
    ()=>getAllSeeds,
    "getSeedConfig",
    ()=>getSeedConfig,
    "isSeedEnabled",
    ()=>isSeedEnabled,
    "setSeedConfig",
    ()=>setSeedConfig,
    "updateSeeds",
    ()=>updateSeeds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$seed$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/seed.json (json)");
;
let runtimeSeeds = null;
function getSeedConfig() {
    if (runtimeSeeds) {
        return runtimeSeeds;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$seed$2e$json__$28$json$29$__["default"];
}
function setSeedConfig(config) {
    runtimeSeeds = config;
}
function isSeedEnabled(page, flag) {
    const config = getSeedConfig();
    const pageSeeds = config[page];
    return pageSeeds?.[flag] === true;
}
function getAllSeeds() {
    return getSeedConfig();
}
function updateSeeds(updates) {
    const current = getSeedConfig();
    const updated = {
        ...current,
        ...updates
    };
    runtimeSeeds = updated;
    return updated;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/seeded/SeededButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SeededButton",
    ()=>SeededButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seeds.ts [app-client] (ecmascript)");
'use client';
;
;
;
const SeededButton = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ seedPage, seedFlag, variant = 'primary', size = 'md', className = '', children, ...props }, ref)=>{
    const isFaultEnabled = seedFlag ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSeedEnabled"])(seedPage, seedFlag) : false;
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantStyles = {
        primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 focus:ring-indigo-500',
        secondary: 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md focus:ring-indigo-500',
        danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 focus:ring-red-500'
    };
    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-sm',
        lg: 'px-8 py-3 text-base'
    };
    // Seed: small hit target
    const hitTargetClass = isFaultEnabled && seedFlag === 'small_hit_target' ? 'p-1 w-3 h-3' : sizeStyles[size];
    // Seed: save affordance confusing (low contrast)
    const confusingAffordance = isFaultEnabled && seedFlag === 'save_affordance_confusing';
    const opacityClass = confusingAffordance ? 'opacity-40' : '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        className: `${baseStyles} ${variantStyles[variant]} ${hitTargetClass} ${opacityClass} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/seeded/SeededButton.tsx",
        lineNumber: 40,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = SeededButton;
SeededButton.displayName = 'SeededButton';
var _c, _c1;
__turbopack_context__.k.register(_c, "SeededButton$forwardRef");
__turbopack_context__.k.register(_c1, "SeededButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/seeded/SeededInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SeededInput",
    ()=>SeededInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seeds.ts [app-client] (ecmascript)");
'use client';
;
;
;
const SeededInput = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ seedPage, label, error, className = '', id, ...props }, ref)=>{
    const missingLabels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSeedEnabled"])(seedPage, 'missing_labels');
    const crypticError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSeedEnabled"])(seedPage, 'cryptic_error');
    const displayLabel = missingLabels ? null : label;
    const displayError = crypticError && error ? 'ERR_INPUT_FAIL' : error;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-4",
        children: [
            displayLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: displayLabel
            }, void 0, false, {
                fileName: "[project]/src/components/seeded/SeededInput.tsx",
                lineNumber: 23,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: ref,
                id: id,
                className: `input-modern ${className}`,
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/seeded/SeededInput.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            displayError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm text-red-600 flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/src/components/seeded/SeededInput.tsx",
                            lineNumber: 36,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/seeded/SeededInput.tsx",
                        lineNumber: 35,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    displayError
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/seeded/SeededInput.tsx",
                lineNumber: 34,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/seeded/SeededInput.tsx",
        lineNumber: 21,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = SeededInput;
SeededInput.displayName = 'SeededInput';
var _c, _c1;
__turbopack_context__.k.register(_c, "SeededInput$forwardRef");
__turbopack_context__.k.register(_c1, "SeededInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/seeded/SeededModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SeededModal",
    ()=>SeededModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seeds.ts [app-client] (ecmascript)");
'use client';
;
;
function SeededModal({ isOpen, onClose, title, children, seedPage }) {
    const noClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSeedEnabled"])(seedPage, 'modal_no_close');
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 overflow-y-auto",
        role: "dialog",
        "aria-modal": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 transition-opacity bg-gray-900/60 backdrop-blur-sm",
                    "aria-hidden": "true",
                    onClick: noClose ? undefined : onClose
                }, void 0, false, {
                    fileName: "[project]/src/components/seeded/SeededModal.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl animate-fade-in",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/seeded/SeededModal.tsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this),
                                !noClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all duration-300",
                                    "aria-label": "Close modal",
                                    "data-testid": "modal-close-button",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/seeded/SeededModal.tsx",
                                            lineNumber: 41,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/seeded/SeededModal.tsx",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/seeded/SeededModal.tsx",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/seeded/SeededModal.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        children
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/seeded/SeededModal.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/seeded/SeededModal.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/seeded/SeededModal.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = SeededModal;
var _c;
__turbopack_context__.k.register(_c, "SeededModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/seeded/SeededToggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SeededToggle",
    ()=>SeededToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seeds.ts [app-client] (ecmascript)");
'use client';
;
;
;
const SeededToggle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ seedPage, label, description, checked = false, onChange, ...props }, ref)=>{
    const ambiguousLabels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSeedEnabled"])(seedPage, 'ambiguous_toggle_labels');
    const noWarn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSeedEnabled"])(seedPage, 'destructive_toggle_no_warn');
    const displayLabel = ambiguousLabels ? 'Toggle' : label;
    const displayDescription = ambiguousLabels ? 'Enable/Disable' : description;
    const handleChange = (e)=>{
        if (noWarn && e.target.checked && label.toLowerCase().includes('delete')) {
            // No warning for destructive action
            onChange?.(e);
        } else {
            onChange?.(e);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between py-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-gray-900",
                        children: displayLabel
                    }, void 0, false, {
                        fileName: "[project]/src/components/seeded/SeededToggle.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    displayDescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 mt-0.5",
                        children: displayDescription
                    }, void 0, false, {
                        fileName: "[project]/src/components/seeded/SeededToggle.tsx",
                        lineNumber: 34,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/seeded/SeededToggle.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "relative inline-flex items-center cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: ref,
                        type: "checkbox",
                        checked: checked,
                        onChange: handleChange,
                        className: "sr-only peer",
                        ...props
                    }, void 0, false, {
                        fileName: "[project]/src/components/seeded/SeededToggle.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-purple-600"
                    }, void 0, false, {
                        fileName: "[project]/src/components/seeded/SeededToggle.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/seeded/SeededToggle.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/seeded/SeededToggle.tsx",
        lineNumber: 30,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = SeededToggle;
SeededToggle.displayName = 'SeededToggle';
var _c, _c1;
__turbopack_context__.k.register(_c, "SeededToggle$forwardRef");
__turbopack_context__.k.register(_c1, "SeededToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/seeded/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seeded$2f$SeededButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/seeded/SeededButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seeded$2f$SeededInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/seeded/SeededInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seeded$2f$SeededModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/seeded/SeededModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seeded$2f$SeededToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/seeded/SeededToggle.tsx [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/tasks/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TasksPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seeded$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/seeded/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seeded$2f$SeededButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/seeded/SeededButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seeds.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function TasksPage() {
    _s();
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [newTaskTitle, setNewTaskTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedTasks, setSelectedTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const noConfirmDelete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSeedEnabled"])('tasks', 'no_confirm_delete');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TasksPage.useEffect": ()=>{
            loadTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["TasksPage.useEffect"], [
        filter
    ]);
    const loadTasks = async ()=>{
        setLoading(true);
        try {
            const url = filter !== 'all' ? `/api/tasks?filter=${filter}` : '/api/tasks';
            const res = await fetch(url);
            const data = await res.json();
            setTasks(data.tasks || []);
        } catch (error) {
            console.error('Failed to load tasks:', error);
        } finally{
            setLoading(false);
        }
    };
    const handleAddTask = async (e)=>{
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newTaskTitle
                })
            });
            if (res.ok) {
                const data = await res.json();
                setTasks([
                    ...tasks,
                    data.task
                ]);
                setNewTaskTitle('');
            }
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };
    const handleToggleTask = async (id)=>{
        const task = tasks.find((t)=>t._id === id || t.id === id);
        if (!task) return;
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: !task.completed
                })
            });
            if (res.ok) {
                setTasks(tasks.map((t)=>t._id === id || t.id === id ? {
                        ...t,
                        completed: !task.completed
                    } : t));
            }
        } catch (error) {
            console.error('Failed to toggle task:', error);
        }
    };
    const handleDeleteTask = async (id)=>{
        if (!noConfirmDelete && !confirm('Are you sure you want to delete this task?')) {
            return;
        }
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setTasks(tasks.filter((t)=>t._id !== id && t.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };
    const handleBulkComplete = async ()=>{
        try {
            const promises = Array.from(selectedTasks).map((id)=>fetch(`/api/tasks/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        completed: true
                    })
                }));
            await Promise.all(promises);
            setTasks(tasks.map((task)=>selectedTasks.has(task._id || task.id || '') ? {
                    ...task,
                    completed: true
                } : task));
            setSelectedTasks(new Set());
        } catch (error) {
            console.error('Failed to bulk complete:', error);
        }
    };
    const handleBulkDelete = async ()=>{
        if (!noConfirmDelete && !confirm('Delete selected tasks?')) {
            return;
        }
        try {
            const promises = Array.from(selectedTasks).map((id)=>fetch(`/api/tasks/${id}`, {
                    method: 'DELETE'
                }));
            await Promise.all(promises);
            setTasks(tasks.filter((task)=>!selectedTasks.has(task._id || task.id || '')));
            setSelectedTasks(new Set());
        } catch (error) {
            console.error('Failed to bulk delete:', error);
        }
    };
    const filteredTasks = tasks.filter((task)=>{
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-5xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold gradient-text mb-2",
                        "data-testid": "tasks-title",
                        children: "📋 Tasks"
                    }, void 0, false, {
                        fileName: "[project]/src/app/tasks/page.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Manage your tasks and stay productive"
                    }, void 0, false, {
                        fileName: "[project]/src/app/tasks/page.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/tasks/page.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card p-6 mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleAddTask,
                    className: "flex gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: newTaskTitle,
                            onChange: (e)=>setNewTaskTitle(e.target.value),
                            placeholder: "➕ Add a new task...",
                            className: "input-modern flex-1",
                            "data-testid": "tasks-new-input"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tasks/page.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seeded$2f$SeededButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SeededButton"], {
                            seedPage: "tasks",
                            type: "submit",
                            "data-testid": "tasks-add-btn",
                            disabled: loading,
                            children: loading ? '...' : 'Add Task'
                        }, void 0, false, {
                            fileName: "[project]/src/app/tasks/page.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tasks/page.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tasks/page.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center py-8",
                "data-testid": "tasks-loading",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
                }, void 0, false, {
                    fileName: "[project]/src/app/tasks/page.tsx",
                    lineNumber: 177,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tasks/page.tsx",
                lineNumber: 176,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card p-4 mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setFilter('all'),
                                    className: `px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' : 'text-gray-600 hover:bg-indigo-50'}`,
                                    "data-testid": "tasks-filter-all",
                                    children: "All"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tasks/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setFilter('active'),
                                    className: `px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'active' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' : 'text-gray-600 hover:bg-indigo-50'}`,
                                    "data-testid": "tasks-filter-active",
                                    children: "Active"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tasks/page.tsx",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setFilter('completed'),
                                    className: `px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'completed' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' : 'text-gray-600 hover:bg-indigo-50'}`,
                                    "data-testid": "tasks-filter-completed",
                                    children: "Completed"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tasks/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/tasks/page.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this),
                        selectedTasks.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seeded$2f$SeededButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SeededButton"], {
                                    seedPage: "tasks",
                                    variant: "secondary",
                                    size: "sm",
                                    onClick: handleBulkComplete,
                                    "data-testid": "tasks-bulk-complete",
                                    children: "✓ Complete"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tasks/page.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seeded$2f$SeededButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SeededButton"], {
                                    seedPage: "tasks",
                                    variant: "danger",
                                    size: "sm",
                                    onClick: handleBulkDelete,
                                    "data-testid": "tasks-bulk-delete",
                                    children: "🗑 Delete"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tasks/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/tasks/page.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tasks/page.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tasks/page.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card overflow-hidden",
                children: filteredTasks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-12 text-center",
                    "data-testid": "tasks-empty",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-10 h-10 text-indigo-400",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tasks/page.tsx",
                                    lineNumber: 251,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/tasks/page.tsx",
                                lineNumber: 250,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/tasks/page.tsx",
                            lineNumber: 249,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-lg",
                            children: "No tasks found"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tasks/page.tsx",
                            lineNumber: 254,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-400 text-sm mt-1",
                            children: "Add a new task to get started"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tasks/page.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tasks/page.tsx",
                    lineNumber: 248,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divide-y divide-gray-100",
                    children: filteredTasks.map((task)=>{
                        const taskId = task._id || task.id || '';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex items-center gap-4 p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 ${task.completed ? 'bg-gray-50' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: selectedTasks.has(taskId),
                                    onChange: (e)=>{
                                        if (e.target.checked) {
                                            setSelectedTasks(new Set([
                                                ...selectedTasks,
                                                taskId
                                            ]));
                                        } else {
                                            const newSet = new Set(selectedTasks);
                                            newSet.delete(taskId);
                                            setSelectedTasks(newSet);
                                        }
                                    },
                                    "data-testid": `tasks-checkbox-${taskId}`,
                                    className: "w-5 h-5 text-indigo-600 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:ring-2 cursor-pointer"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tasks/page.tsx",
                                    lineNumber: 268,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: task.completed,
                                    onChange: ()=>handleToggleTask(taskId),
                                    "data-testid": `tasks-toggle-${taskId}`,
                                    className: "w-5 h-5 text-indigo-600 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:ring-2 cursor-pointer"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tasks/page.tsx",
                                    lineNumber: 283,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `flex-1 font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`,
                                    children: task.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tasks/page.tsx",
                                    lineNumber: 290,
                                    columnNumber: 17
                                }, this),
                                task.dueDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full",
                                    "data-testid": `tasks-due-${taskId}`,
                                    children: [
                                        "📅 ",
                                        task.dueDate
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tasks/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleDeleteTask(taskId),
                                    className: `text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-all ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seeds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSeedEnabled"])('tasks', 'small_hit_target') ? 'tiny-hit-target' : ''}`,
                                    "data-testid": `tasks-delete-${taskId}`,
                                    "aria-label": `Delete task: ${task.title}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tasks/page.tsx",
                                            lineNumber: 309,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tasks/page.tsx",
                                        lineNumber: 308,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tasks/page.tsx",
                                    lineNumber: 300,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, taskId, true, {
                            fileName: "[project]/src/app/tasks/page.tsx",
                            lineNumber: 262,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/app/tasks/page.tsx",
                    lineNumber: 258,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tasks/page.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/tasks/page.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_s(TasksPage, "ukebjJ6lNpEnWxMBQjM6y49fWac=");
_c = TasksPage;
var _c;
__turbopack_context__.k.register(_c, "TasksPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_ec6abcd5._.js.map