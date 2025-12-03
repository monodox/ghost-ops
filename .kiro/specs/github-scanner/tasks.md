# Implementation Plan

- [ ] 1. Set up project structure and authentication
  - Create Next.js project with TypeScript and Tailwind CSS
  - Install dependencies (Framer Motion, Lucide React, shadcn/ui, Octokit)
  - Configure GitHub OAuth application
  - Set up environment variables
  - _Requirements: 1.1, 1.2, 1.5_

- [ ] 1.1 Implement GitHub OAuth flow
  - Create `/api/auth/github` route for OAuth initiation
  - Create `/api/auth/github/callback` route for OAuth callback
  - Implement secure cookie-based session management
  - Add token expiration handling
  - _Requirements: 1.1, 1.2, 1.3_

- [ ]* 1.2 Write property test for authentication
  - **Property 1: Authentication Token Persistence**
  - **Validates: Requirements 1.2, 1.3**

- [ ] 1.3 Implement logout functionality
  - Create logout API route
  - Clear authentication cookies
  - Redirect to login page
  - _Requirements: 1.4_

- [ ] 2. Create repository listing page
  - Build RepositoriesPage component structure
  - Implement state management for repositories
  - Add loading and error states
  - Create responsive grid layout
  - _Requirements: 2.1, 2.2, 2.3, 9.1, 9.2, 9.3_

- [ ] 2.1 Implement GitHub API integration
  - Create `/api/github/repos` endpoint
  - Use Octokit to fetch user repositories
  - Handle authentication errors
  - Implement error handling and retry logic
  - _Requirements: 2.1, 2.3, 7.1, 7.2_

- [ ]* 2.2 Write property test for repository listing
  - **Property 2: Repository List Consistency**
  - **Validates: Requirements 2.1**

- [ ] 2.3 Build RepoCard component
  - Create card layout with repository information
  - Add status badge with dynamic colors
  - Implement hover animations
  - Display last updated timestamp
  - _Requirements: 2.4, 6.4_

- [ ] 2.4 Add refresh functionality
  - Implement refresh button with loading state
  - Add animated refresh icon
  - Update repository list on refresh
  - _Requirements: 2.5_

- [ ] 3. Implement repository creation
  - Create CreateRepoModal component
  - Build repository creation form
  - Add form validation
  - Implement modal animations
  - _Requirements: 3.1, 3.5, 6.1_

- [ ] 3.1 Create repository creation API
  - Build `/api/github/create-repo` endpoint
  - Validate repository name format
  - Use Octokit to create repository
  - Handle creation errors
  - _Requirements: 3.2, 3.4, 7.1_

- [ ]* 3.2 Write property test for repository validation
  - **Property 9: Repository Creation Validation**
  - **Validates: Requirements 3.5**

- [ ] 3.3 Add success handling
  - Display success notification
  - Refresh repository list
  - Close modal and reset form
  - _Requirements: 3.3_

- [ ] 4. Build security scanning functionality
  - Create scan trigger button in RepoCard
  - Implement scanning state management
  - Add animated scanning indicator
  - Handle multiple concurrent scans
  - _Requirements: 4.1, 4.2_

- [ ] 4.1 Implement scan API endpoint
  - Create `/api/scan/trigger` route
  - Fetch repository details from GitHub
  - Generate mock scan results
  - Calculate health score
  - _Requirements: 4.4, 5.1_

- [ ]* 4.2 Write property test for health score calculation
  - **Property 4: Health Score Calculation**
  - **Validates: Requirements 5.1**

- [ ]* 4.3 Write property test for severity totals
  - **Property 5: Severity Categorization Completeness**
  - **Validates: Requirements 5.2**

- [ ]* 4.4 Write property test for scan idempotency
  - **Property 3: Scan Idempotency**
  - **Validates: Requirements 4.1, 4.4**

- [ ] 4.5 Add scan timing and performance
  - Implement realistic scan duration (1-4 seconds)
  - Add file count simulation
  - Ensure scans complete within 5 seconds
  - _Requirements: 4.5_

- [ ] 5. Create scan results display
  - Build ScanResultModal component
  - Design health score display
  - Create findings breakdown layout
  - Add scan statistics section
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 5.1 Implement modal animations
  - Add entrance animation (scale + fade)
  - Implement health score spring animation
  - Create staggered findings animation
  - Add stats fade-in animation
  - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [ ]* 5.2 Write property test for animation timing
  - **Property 7: Modal Animation Completion**
  - **Validates: Requirements 6.5**

- [ ] 5.3 Add scan results summary to RepoCard
  - Create horizontal results layout
  - Display health score and severity counts
  - Add visual dividers
  - Show scan duration and file count
  - _Requirements: 5.2, 5.3_

- [ ] 5.4 Implement scan result persistence
  - Store results in component state (Map)
  - Maintain results across re-renders
  - Update results on rescan
  - Display most recent scan timestamp
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ]* 5.5 Write property test for result persistence
  - **Property 10: Scan Results Persistence**
  - **Validates: Requirements 8.1, 8.3**

- [ ] 5.6 Update repository status badges
  - Implement dynamic status based on scan results
  - Add color-coded severity indicators
  - Show "Scanning..." during active scans
  - Display "Not Scanned" for unscanned repos
  - _Requirements: 5.5_

- [ ]* 5.7 Write property test for state transitions
  - **Property 6: Scan State Transitions**
  - **Validates: Requirements 4.2, 5.5**

- [ ] 6. Implement error handling
  - Add error boundaries for components
  - Create error display components
  - Implement spooky-themed error messages
  - Add retry functionality
  - _Requirements: 7.1, 7.3, 7.4_

- [ ]* 6.1 Write property test for error messages
  - **Property 8: Error Message Display**
  - **Validates: Requirements 7.1, 7.4**

- [ ] 6.2 Handle authentication errors
  - Detect expired tokens
  - Redirect to login with context
  - Display authentication error messages
  - _Requirements: 7.2_

- [ ] 6.3 Add network error handling
  - Detect offline status
  - Display offline indicator
  - Implement automatic retry with backoff
  - _Requirements: 7.5_

- [ ] 7. Apply spooky theme consistency
  - Review all user-facing text
  - Replace generic terms with spooky vocabulary
  - Add ghost emoji to notifications
  - Ensure purple/dark color scheme
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ]* 7.1 Write property test for spooky terminology
  - **Property 12: Spooky Terminology Consistency**
  - **Validates: Requirements 10.1, 10.3**

- [ ] 7.2 Add animated ghost icons
  - Implement ghost icon in loading states
  - Add bounce animation for scanning
  - Create pulse animation for warnings
  - _Requirements: 10.2_

- [ ] 8. Implement responsive design
  - Test layout on mobile devices (< 768px)
  - Test layout on tablets (768-1024px)
  - Test layout on desktop (> 1024px)
  - Adjust touch targets for mobile
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ]* 8.1 Write property test for responsive layout
  - **Property 11: Responsive Layout Adaptation**
  - **Validates: Requirements 9.1, 9.2, 9.3**

- [ ] 9. Add final polish and optimizations
  - Implement React.memo for expensive components
  - Add loading skeletons
  - Optimize animation performance
  - Test accessibility (keyboard navigation, ARIA labels)
  - _Requirements: All_

- [ ]* 9.1 Write unit tests for components
  - Test RepoCard rendering with various props
  - Test ScanResultModal animations
  - Test CreateRepoModal form validation
  - Test error boundary behavior

- [ ]* 9.2 Write integration tests
  - Test end-to-end OAuth flow
  - Test repository listing and refresh
  - Test scan trigger and result display
  - Test repository creation workflow

- [ ] 10. Checkpoint - Ensure all tests pass
  - Run all unit tests
  - Run all property-based tests
  - Run all integration tests
  - Fix any failing tests
  - Ensure all tests pass, ask the user if questions arise.
