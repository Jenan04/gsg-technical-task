# Rick and Morty React App

A React + TypeScript application using TanStack Query to display Rick and Morty characters and their episodes.

## Project Structure
   ```
   src/
   ├── components/
   │ ├── CharacterCard.tsx
   │ ├── CharacterList.tsx
   │ ├── SearchInput.tsx
   │ └── EpisodeList.tsx
   ├── pages/
   │ ├── CharactersPage.tsx
   │ └── CharacterDetailsPage.tsx
   ├── services/
   │ └── api.ts
   ├── types/
   │ └── index.ts
   ├── utils/
   │ └── useCharacters.ts
   ├── App.tsx
   └── main.tsx
```

## Features

- ✅ Set up React + TypeScript with TanStack Query
- ⏳ Characters Page with list and search
- ⏳ Search functionality by name
- ⏳ Character Details Page with image, info, episodes
- ⏳ Routing between pages
- ⏳ Clean architecture with proper types
- ⏳ API handling with TanStack Query

## API Endpoints

- Characters: `https://rickandmortyapi.com/api/character`
- Character by ID: `https://rickandmortyapi.com/api/character/:id`
- Search by name: `https://rickandmortyapi.com/api/character/?name=`
- Episodes: `https://rickandmortyapi.com/api/episode/`

## Key Components

- **CharacterCard**: Display individual character info  
- **CharacterList**: Grid of character cards with pagination  
- **SearchInput**: Search functionality with debouncing  
- **CharacterDetailsPage**: Full character details with episodes  
- **EpisodeList**: Display episodes where character appeared  

## State Management

- **TanStack Query** for API state management  
- **React Router** for navigation  
- **Local state** for search input and UI states

## Getting Started

1. Clone the repo:
   ```bash
   git clone <repo-url>
   ```
2. install dependencies:
   ```
    npm install
    # or yarn
    ```
3. Start the development server:
    ```
    npm run dev
    # or yarn dev
    ```
   
  ## Live Demo
You can check the live version of the app here: [Rick and Morty App](https://gsg-technical-task.onrender.com)
