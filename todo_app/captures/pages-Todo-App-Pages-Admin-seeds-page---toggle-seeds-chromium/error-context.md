# Page snapshot

```yaml
- generic [ref=e1]:
  - navigation [ref=e2]:
    - link "TodoApp" [ref=e5] [cursor=pointer]:
      - /url: /
  - main [ref=e6]:
    - generic [ref=e7]:
      - heading "Admin - Seed Configuration" [level=1] [ref=e8]
      - generic [ref=e9]:
        - heading "Mode" [level=2] [ref=e10]
        - generic [ref=e11]:
          - generic [ref=e12]:
            - radio "Lite (low/medium severity)" [checked] [active] [ref=e13]
            - generic [ref=e14]: Lite (low/medium severity)
          - generic [ref=e15]:
            - radio "Full (all severities)" [ref=e16]
            - generic [ref=e17]: Full (all severities)
      - generic [ref=e18]:
        - button "Save Changes" [ref=e19]
        - button "Reset to Defaults" [ref=e20]
      - generic [ref=e21]:
        - heading "How it works" [level=3] [ref=e22]
        - list [ref=e23]:
          - listitem [ref=e24]: • Toggle flags to enable/disable specific UI faults
          - listitem [ref=e25]: • Click "Save Changes" to persist to MongoDB
          - listitem [ref=e26]: • Changes take effect immediately on page refresh
          - listitem [ref=e27]: • Use Lite mode for minor issues, Full for all issues
  - button "Open Next.js Dev Tools" [ref=e33] [cursor=pointer]:
    - img [ref=e34]
  - alert [ref=e37]
```