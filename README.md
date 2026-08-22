# 🚗 AI-Powered Car Rental Application

A modern, cross-platform mobile car rental application built with **React Native (Expo)**, **TypeScript**, and **Google Gemini AI**. This application streamlines the car booking experience by integrating artificial intelligence for smart vehicle discovery and automated visual damage inspection.

---

## 🌟 Key Features

*   **🤖 AI Smart Vehicle Advisor:** Uses Google Gemini to process natural language queries (e.g., *"Find me an economical SUV for a mountain trip"*) and returns tailored car recommendations in structured format.
*   **📷 Visual Damage Inspection (Vision AI):** Multimodal image processing that analyzes pre- and post-rental vehicle photos to detect exterior damage automatically.
*   **📅 Seamless Fleet Booking:** Interactive booking pipeline with real-time availability, dynamic pricing, and reservation tracking.
*   **📱 Native Cross-Platform UI:** Designed with React Native and Expo for performant execution across Android and iOS devices.
*   **🔐 Type-Safe Architecture:** Full end-to-end type safety using TypeScript and structured JSON schemas for API responses.

---

## 🛠️ Tech Stack

*   **Frontend Framework:** [React Native](https://reactnative.dev/) (via [Expo Go](https://expo.dev/))
*   **Programming Language:** [TypeScript](https://www.typescriptlang.org/)
*   **AI Engine:** [Google Gen AI SDK](https://www.npmjs.com/package/@google/genai) (`gemini-2.5-flash`)
*   **State & Styling:** React Context / Native StyleSheet API
*   **Backend / Database:** PostgreSQL / Supabase *(Planned)*

---

## 📂 Project Structure

```text
car-rental-application/
├── assets/               # Static images, fonts, and icons
├── src/
│   ├── components/       # Reusable UI components (CarCard, Input, Buttons)
│   ├── config/           # API configurations & Gemini setup
│   ├── navigation/       # React Navigation stack & tab screen setup
│   ├── screens/          # Application screens (Home, AI Assistant, Booking)
│   ├── services/         # Gemini AI & Backend service layer
│   ├── types/            # TypeScript interfaces & types definition
│   └── utils/            # Helper functions and transformers
├── .env.example          # Template for environment variables
├── App.tsx               # Entry point of the application
├── app.json              # Expo configuration file
└── tsconfig.json         # TypeScript compiler configuration
```
---

## 🚀 Getting Started

**Prerequisites**
* **Node.js** (v18 or higher)
* **VS Code**
* **Expo Go App** installed on your mobile device
* **Google AI** Studio API Key
