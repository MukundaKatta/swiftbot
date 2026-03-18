# SwiftBot

Delivery robot fleet management platform with real-time mapping, firmware updates, diagnostics, and deployment planning.

## Features

- **Fleet Map** -- Real-time geographic tracking of all delivery robot units
- **Unit Detail** -- Detailed status, battery, and performance for individual robots
- **Leaderboard** -- Rank robots by delivery performance and reliability metrics
- **Firmware Manager** -- Roll out firmware updates to robot fleets
- **Diagnostics Panel** -- Monitor hardware health, motors, sensors, and connectivity
- **Pricing Configurator** -- Set delivery pricing based on distance and demand
- **Deployment Planner** -- Plan new robot deployments in target areas

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **State Management:** Zustand
- **Database:** Supabase
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd swiftbot
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
swiftbot/
├── app/                  # Next.js App Router pages
├── components/           # React components
│   ├── FleetMap.tsx
│   ├── UnitDetail.tsx
│   ├── Leaderboard.tsx
│   ├── FirmwarePanel.tsx
│   ├── DiagnosticsPanel.tsx
│   ├── PricingConfigurator.tsx
│   └── DeploymentPlanner.tsx
├── lib/                  # Utilities, store, mock data
├── public/               # Static assets
└── package.json
```

