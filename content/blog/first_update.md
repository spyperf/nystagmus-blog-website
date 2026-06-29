---
title: "Beginning the Eye Tracking Project"
date: "2026-06-29"
excerpt: "Setting up the first version of the pupil tracking system."
---


# Introduction

This is the first update on my eye tracking project.

The goal is to create an accurate pupil tracking pipeline.

## Current approach

I am experimenting with:

- Python
- OpenCV
- Computer vision techniques


## Example code


```python
import cv2


video = cv2.VideoCapture(
    "eye.mp4"
)


while True:

    ret, frame = video.read()

    if not ret:
        break

    cv2.imshow(
        "eye",
        frame
    )