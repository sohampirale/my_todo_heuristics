# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - link "TodoApp" [ref=e5] [cursor=pointer]:
      - /url: /
  - main [ref=e6]:
    - generic [ref=e8]:
      - heading "Reset Password" [level=1] [ref=e9]
      - generic [ref=e10]:
        - generic [ref=e11]:
          - textbox "Enter your email" [ref=e12]: test@example.com
          - paragraph [ref=e13]: ERR_INPUT_FAIL
        - button "Send Reset Link" [ref=e14]
      - button "Back to Sign In" [ref=e16]
  - button "Open Next.js Dev Tools" [ref=e22] [cursor=pointer]:
    - img [ref=e23]
  - alert [ref=e26]
```