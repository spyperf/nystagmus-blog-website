---
title: "Hardware Challenges"
date: "2026-06-30"
excerpt: "Post"
---

Hardware Component Analysis

Initial Hardware Selection — Raspberry Pi Zero
The Raspberry Pi Zero was initially considered as the primary processing unit due to its compact form factor. However, it was deemed insufficient for this application for two key reasons. First, its ARM Cortex-A53 CPU lacks the processing power required to run real-time computer vision operations using OpenCV at an acceptable frame rate. Second, its 512MB of RAM is inadequate for the program, which requires approximately 1GB to operate effectively. A solution to this problem could be the Raspberry Pi 5. It features an ARM Cortex-A76 CPU capable of handling the processing demands of the application, along with a 4GB RAM configuration that comfortably exceeds our memory requirements. However, its physical size presents a challenge, as it is too large to be integrated directly into a glasses frame.

Proposed Solutions for Size Constraints:

Option 1 — External Processing Unit (Primary Prototype)
The most practical near-term solution is to house the processing unit in a small enclosure clipped to the user&apos;s clothing. The unit would connect to the cameras mounted on the glasses frame via a thin wire, transmitting voltage signals to the liquid crystal cells. This approach allows development to proceed without custom hardware.

Option 2 — Custom PCB (Secondary Prototype)
If full integration into the glasses frame is required, a custom PCB could be designed to incorporate only the essential components, significantly reducing size and weight. This would be pursued as a second prototype once the primary model has been validated.

Option 3 — Coral Dev Board Micro with C++ Migration
If a custom PCB proves infeasible, the Coral Dev Board Micro could be explored as an alternative compact platform. However, since it does not support Python, this would require a full migration of the codebase from Python to C++, which represents a significant additional development effort.