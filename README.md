# 🎮 RPG Character Editor

![TypeScript](https://img.shields.io/badge/TypeScript-84.6%25-3178C6)
![CSS](https://img.shields.io/badge/CSS-8.3%25-1572B6)
![HTML](https://img.shields.io/badge/HTML-7.1%25-E34F26)
![Status](https://img.shields.io/badge/Status-Live-success)

## 🌐 Live Version

Try the editor live at: [https://rpgeditor.prewcio.dev](https://rpgeditor.prewcio.dev)

## 🎯 Overview

A minimalistic RPG Character Editor built with React and TypeScript. This web application provides a simple and intuitive interface for creating and managing RPG character sheets, with support for both English and Polish languages.

## ✨ Features

### Character Management
- Create new character sheets with customizable attributes
- Import existing characters from `.rpg.json` files
- Export characters for easy sharing and storage
- Bilingual support (English/Polish)

### Character Attributes
- Basic Information:
  - Character Name
  - Race
  - Class
  - Origin
  - Background
- Optional Features:
  - Experience tracking
  - Automatic level calculation
  - Character description
  - Handicap mode for experience modification

### Experience System
- Base experience requirement: 300
- Progressive level scaling (10% increase per level)
- Percentage-based progress tracking
- Automatic level calculation

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/prewcio/easyRPGEditor.git

# Navigate to project directory
cd easyRPGEditor

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🛠️ Technical Details

### Built With
- TypeScript (84.6%)
- CSS (8.3%)
- HTML (7.1%)
- React.js (Created with Create React App)

### File Format
Characters are saved in `.rpg.json` format with the following structure:
```json
{
  "name": "",
  "race": "",
  "class": "",
  "alg": "",
  "bcg": "",
  "exp": 0,
  "lvl": 0,
  "desc": ""
}
```

## 💻 Usage

### Creating a New Character
1. Select your preferred language (English/Polish)
2. Click "CREATE NEW CHARACTER"
3. Fill in the required fields (marked with *)
4. Optionally enable handicap mode for experience modification
5. Add a character description if desired
6. Click "CREATE CHARACTER" to save

### Importing Characters
1. Click "IMPORT CHARACTER"
2. Select a `.rpg.json` file
3. View or edit the character details
4. Save changes if needed

## 🔧 Development

### Project Structure
```
src/
├── App.tsx           # Main application component
├── Req.tsx          # Required field indicator
├── langs/           # Language components
│   ├── English.tsx  # English language implementation
│   └── Polish.tsx   # Polish language implementation
└── App.css          # Styles
```

### Level Calculation Formula
```typescript
requiredExp = baseExp + (level * (baseExp * 0.1))
// where baseExp = 300
```

## 📚 Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
For more information about React and how to customize this application further, 
check out the [React documentation](https://reactjs.org/).

## 👤 Author

**Prewcio**
- Website: [rpgeditor.prewcio.dev](https://rpgeditor.prewcio.dev)
- GitHub: [@prewcio](https://github.com/prewcio)
- Email: [this.prewcio@gmail.com](mailto:this.prewcio@gmail.com)

## 📄 License

This project is open-source and available under the MIT License.

---

*Last Updated: 2025-02-28 22:39:12 UTC*  
*Project Status: Live at [rpgeditor.prewcio.dev](https://rpgeditor.prewcio.dev)*
