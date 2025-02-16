# Stock Trader

## 📌 Overview

A stock trader is web application that fetches real-time stock prices, options data, and market trends

It collects data from Yahoo Finance and itegrates Alpha Vintage APIto provide stock details and option trading insights

## 🚀 Features

- Retrieve stock options with expiration, delta, premium and option type filtering

- Integrate data from Yahoo Finance and Alpha Vintage API

- Analyze historical stock prices through chart

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS, TypeScript, Redux

- **Backend:** ASP.NET Core, C#

- **API's:** Alpha Vintages

## Requirements

- NodeJS runtime
- ASP.NET for web development

## ⚙️ Installation & Setup

### 1️ Clone the Repository

```sh
git clone git@github.com:EdvinBec/stock-trader.git

cd stock-trader
```

### 2. Create a `.env` File and Set the Backend URL

In the root folder create `.env` file and enter the `VITE_API_URL`.\*

By default, the backend runs on port `5074`. If your setup uses a different port, adjust accordingly.

```
VITE_API_URL=http://localhost:5074 //CAUTION: Make sure that there is no slash at the end
```

### 3. Enter Alpha Vintage API key in `appsettings.json`

Go into `/api/appsettings.json` and replace `YOUR_API_KEY_GOES_HERE` with your actual API key, that you can get here https://www.alphavantage.co/support/#api-key

```
.
.
"AlphaVintage":  {
"BaseURL":  "https://www.alphavantage.co",
"ApiKey":  "YOUR_API_KEY_GOES_HERE"
}
```

### 4. Install needed packages and run the backend

Firstly open the terminal and move into `/api` folder with next command `cd api`. Then type `dotnet restore` and press enter. After that type `dotnet watch run` and press enter to run the backend.

### 4. Install node packages and run frontend

Open **new terminal** in the **root** folder and type `npm install` and press enter. After it's finished installing type `npm run dev` and press enter to run the app.

### 5. Open the app in the browser

Typically Vite runs on [http:localhost:5173](http:localhost:5173)
