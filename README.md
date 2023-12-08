## Poll API App

### Introduction

This document serves as a guide to the Poll API application. It provides an overview of the application's functionality, architecture, and usage.

### Features

* Create and manage polls
* Define single and multiple selection question types
* Set start and end dates for polls
* Assign minimum and maximum reward points
* Users can submit answers to polls
* View poll results and analytics

### Technology Stack

* Back-end: Node.js, Express.js, Sequelize.js
* Database: SQLite

### API Endpoints

| Endpoint | Description | Method |
|---|---|---|
| `api/polls` | Get all polls | GET |
| `api/polls/:pollId` | Update a specific poll | PUT |
| `api/polls/:pollId/questions?page=1` | Get all questions for a specific poll | GET |
| `/api/polls/:pollId/submit` | Submit answers to a poll | POST |
| `api/polls/analytics` | Get poll analytics | GET |

### Example Usage

#### Create a poll

```json
 {
  "title": "Test Poll 15",
  "category": "Poll Category 2",
  "startDate": "2023-01-01",
  "endDate": "2023-01-01",
  "minimumReward": 0,
    "maximumReward":100,
  "questionSets": [
    {
      "questionType": "single selection",
      "questionText": "Question 1",
      "options": ["Option 1", "Option 2", "Option 3"],
      "answer":[1]
    },
    {
      "questionType": "single selection",
      "questionText": "Question 2",
      "options": ["Option 1", "Option 2", "Option 3"],
      "answer":[1]
    }
  ]
}
```

#### Get all polls
| Endpoint | Description | Method |
|---|---|---|
| 'api/polls' | Get all the available polls | GET |

#### Submit answers to a poll
| Endpoint | Description | Method |
|---|---|---|
| 'api/polls/:pollId/submit' | Vote submit for a poll | POST |

```json
{
  "answers": {
    // answer key-value pairs based on question IDs
     "1": [1],
    "2": [1]
  }
}
```

#### Get poll analytics
//currently only number of total votes is available
| Endpoint | Description | Method |
|---|---|---|
| 'api/polls/:pollId/analytics' | Get analytics for a specific the available polls | GET |
| 'api/polls/analytics' | Get analytics for all the available polls | GET |

### Development and Testing

* Run `npm install` to install dependencies
* Run `npm start` to start the development server
