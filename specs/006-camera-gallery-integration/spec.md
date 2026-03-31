# Feature Specification: Real Camera and Gallery Integration for Food Scanning

**Feature Branch**: `006-camera-gallery-integration`
**Created**: 2026-03-31
**Status**: Draft
**Input**: User description: "i want to use real camera / gallery integration for food scanning page."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Capture Food Photo with Camera (Priority: P1) 🎯 MVP

As a user, I want to use my device's camera to take a photo of my food so that I can quickly log what I'm eating.

**Why this priority**: This is the core functionality - users need to capture food images in real-time to identify and log meals. Without camera access, the food scanning feature cannot function.

**Independent Test**: Can be fully tested by opening the scan screen, tapping the capture button, and verifying a photo is taken and displayed. Delivers immediate value for food logging.

**Acceptance Scenarios**:

1. **Given** the user is on the scan screen with "AI Camera" mode selected, **When** the user taps the capture button, **Then** the system takes a photo using the device camera and displays the captured image
2. **Given** the user has not granted camera permission, **When** the user tries to capture a photo, **Then** the system prompts for camera permission with a clear explanation of why it's needed
3. **Given** the user denies camera permission, **When** the user tries to use camera mode, **Then** the system shows a helpful message explaining how to enable camera access in settings
4. **Given** the camera is active, **When** the user views the scan screen, **Then** the live camera preview is displayed in the scanning frame area

---

### User Story 2 - Select Food Photo from Gallery (Priority: P1)

As a user, I want to select an existing photo from my device's gallery so that I can log food from photos I've already taken.

**Why this priority**: Equally critical as camera capture - users often photograph food before eating and want to log it later. This enables flexible food logging workflows.

**Independent Test**: Can be fully tested by selecting "Gallery" mode, choosing a photo from the device gallery, and verifying the selected image is displayed in the scan frame.

**Acceptance Scenarios**:

1. **Given** the user is on the scan screen with "Gallery" mode selected, **When** the user taps the capture/select button, **Then** the system opens the device photo gallery for selection
2. **Given** the user is viewing the photo gallery, **When** the user selects an image, **Then** the selected image is displayed in the scanning frame
3. **Given** the user has not granted photo library permission, **When** the user tries to access the gallery, **Then** the system prompts for photo library permission
4. **Given** the user cancels photo selection without choosing an image, **When** returning to the scan screen, **Then** the scan screen returns to its previous state without changes

---

### User Story 3 - Switch Between Scan Modes (Priority: P2)

As a user, I want to switch between camera, barcode, and gallery modes so that I can choose the best method to scan my food.

**Why this priority**: Enhances usability by allowing mode switching. Builds on P1 stories but is not critical for initial MVP functionality.

**Independent Test**: Can be fully tested by tapping different mode buttons and verifying the interface updates appropriately for each mode.

**Acceptance Scenarios**:

1. **Given** the user is on the scan screen, **When** the user taps the "AI Camera" button, **Then** the camera mode activates showing live camera preview
2. **Given** the user is on the scan screen, **When** the user taps the "AI Barcode" button, **Then** the barcode scanning mode activates
3. **Given** the user is on the scan screen, **When** the user taps the "Gallery" button, **Then** the gallery mode activates showing the last captured/selected image or a placeholder
4. **Given** the user switches modes, **When** the mode changes, **Then** the header title updates to reflect the current mode

---

### Edge Cases

- What happens when the device does not have a camera? Display a message directing user to use gallery mode instead
- How does system handle when the camera is in use by another application? Show appropriate error message and suggest trying again
- What happens when the photo gallery is empty? Show a friendly empty state message
- How does system handle low storage when trying to save captured photo? Notify user and suggest freeing up space
- What happens on permission denial after previous grant (revoked in settings)? Detect and show re-permission request with settings link

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST request camera permission before accessing the device camera
- **FR-002**: System MUST display live camera preview in the scanning frame when camera mode is active
- **FR-003**: System MUST capture a photo when the user taps the capture button in camera mode
- **FR-004**: System MUST request photo library permission before accessing the device gallery
- **FR-005**: System MUST open the device photo picker when the user taps the select button in gallery mode
- **FR-006**: System MUST display the selected or captured image in the scanning frame
- **FR-007**: System MUST show permission status indicators when permissions are denied
- **FR-008**: System MUST provide a way to navigate to device settings when permissions are denied
- **FR-009**: System MUST update the header title based on the active scan mode (AI Camera, AI Barcode, Gallery)
- **FR-010**: System MUST preserve the last captured/selected image when switching between modes
- **FR-011**: System MUST handle permission denial gracefully with user-friendly messaging
- **FR-012**: System MUST persist captured/selected images to app storage for use by food recognition feature

### Key Entities

- **CapturedImage**: Represents a photo taken by the camera or selected from gallery; includes image data, source (camera/gallery), and timestamp; persisted to app storage for food recognition
- **Permission**: Represents device permission status for camera and photo library access; states include granted, denied, undetermined

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can capture a food photo within 3 seconds of tapping the capture button
- **SC-002**: Users can select a photo from gallery within 5 seconds of opening the picker
- **SC-003**: 95% of permission requests result in a clear user action (grant or intentional denial)
- **SC-004**: Camera preview displays within 1 second of activating camera mode
- **SC-005**: Mode switching completes instantly with no perceivable delay
- **SC-006**: All error states provide actionable guidance to users

## Clarifications

### Session 2026-03-31

- Q: Should captured images be persisted or transient? → A: Persist captured images to app storage for use by food recognition feature

## Assumptions

- Users have devices with a rear-facing camera capable of taking photos
- The application targets iOS and Android platforms with standard camera and photo library APIs
- Users have sufficient device storage for at least one photo capture
- The existing scan screen UI layout and mode buttons will be preserved
- Barcode scanning mode implementation is out of scope for this feature (placeholder only)
- Image processing/AI analysis of captured photos is out of scope (separate feature)
- The captured/selected image display is for preview purposes; actual food recognition will be handled by a separate feature
