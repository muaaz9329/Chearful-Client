export const journalTypes = [
  {
    id: 1,
    title: 'Relationship',
    description: 'Relationship with partner, family, friends, etc.',
  },
  {
    id: 2,
    title: 'Work',
    description: 'Work related journal entries.',
  },
  {
    id: 3,
    title: 'Family',
    description: "Improve your family's well-being.",
  },
  {
    id: 4,
    title: 'Health',
    description: 'Physical and mental health.',
  },
  {
    id: 5,
    title: 'Spiritual',
    description: 'Spiritual well-being.',
  },
  {
    id: 6,
    title: 'Personal',
    description: 'Personal growth and development.',
  },
];

export const journalEntryTimes = [
  {
    id: 1,
    title: 'Morning',
  },
  {
    id: 2,
    title: 'Evening',
  },
  {
    id: 3,
    title: 'Night',
  },
];

export const journalEntries = [
  {
    id: 1,
    type: {
      id: 1,
      title: 'Relationship',
    },
    time: {
      id: 1,
      title: 'Morning',
    },
    date: '2023-11-10',
    assignedBy: null, // null = self, {id: 1, title: 'John Doe', profilePic: url} = assigned by someone
    data: [
      {
        id: 1,
        title: 'How did I feel today?',
        type: 'question',
        answer: '',
      },
      {
        id: 2,
        title: 'Do you have a forgiving nature?',
        type: 'option',
        options: [
          {
            id: 1,
            title: 'Yes',
          },
          {
            id: 2,
            title: 'No',
          },
          {
            id: 3,
            title: 'Depends on the situation',
          },
        ],
      },
      {
        id: 3,
        type: 'rate',
        title: 'How would you rate your relationship with your partner?',
        range: {
          min: 1,
          max: 5,
          step: 1,
        },
      },
    ],
  },
  {
    id: 2,
    date: '2023-11-10',
    type: {
      id: 2,
      title: 'Work',
    },
    time: {
      id: 1,
      title: 'Morning',
    },
    assignedBy: {
      id: 3,
      title: 'Alice Smith',
      profilePic: 'alice_profile_pic_url',
    },
    data: [
      {
        id: 1,
        title: 'How did I feel about work today?',
        type: 'question',
        answer: '',
      },
      {
        id: 2,
        title: 'Did you accomplish your daily tasks?',
        type: 'option',
        options: [
          {
            id: 1,
            title: 'Yes',
          },
          {
            id: 2,
            title: 'No',
          },
          {
            id: 3,
            title: 'Partially',
          },
        ],
      },
      {
        id: 3,
        type: 'rate',
        title: 'Rate your overall work satisfaction today.',
        range: {
          min: 1,
          max: 5,
          step: 1,
        },
      },
    ],
  },

  {
    id: 3,
    date: '2023-11-09',
    type: {
      id: 3,
      title: 'Family',
    },
    time: {
      id: 2,
      title: 'Evening',
    },
    assignedBy: null,
    data: [
      {
        id: 1,
        title: 'Highlight of the day with family.',
        type: 'text',
        answer: '',
      },
      {
        id: 2,
        title: 'What could have been improved in family interactions?',
        type: 'text',
        answer: '',
      },
      {
        id: 3,
        type: 'rate',
        title: 'Rate the quality of family time today.',
        range: {
          min: 1,
          max: 5,
          step: 1,
        },
      },
    ],
  },
  {
    id: 4,
    date: '2023-11-09',
    type: {
      id: 4,
      title: 'Health',
    },
    time: {
      id: 3,
      title: 'Night',
    },
    assignedBy: null,
    data: [
      {
        id: 1,
        title: 'Describe your physical activity today.',
        type: 'text',
        answer: '',
      },
      {
        id: 2,
        title: 'Did you follow your health routine?',
        type: 'option',
        options: [
          {
            id: 1,
            title: 'Yes',
          },
          {
            id: 2,
            title: 'No',
          },
          {
            id: 3,
            title: 'Partially',
          },
        ],
      },
      {
        id: 3,
        type: 'rate',
        title: 'How would you rate your overall well-being?',
        range: {
          min: 1,
          max: 5,
          step: 1,
        },
      },
    ],
  },

  // Entry 5
  {
    id: 5,
    date: '2023-11-08',
    type: {
      id: 5,
      title: 'Spiritual',
    },
    time: {
      id: 1,
      title: 'Morning',
    },
    assignedBy: {
      id: 2,
      title: 'Bob Johnson',
      profilePic: 'bob_profile_pic_url',
    },
    data: [
      {
        id: 1,
        title: 'Reflect on a spiritual thought or quote.',
        type: 'text',
        answer: '',
      },
      {
        id: 2,
        title: 'Did you engage in spiritual practices today?',
        type: 'option',
        options: [
          {
            id: 1,
            title: 'Yes',
          },
          {
            id: 2,
            title: 'No',
          },
          {
            id: 3,
            title: 'Not applicable',
          },
        ],
      },
      {
        id: 3,
        type: 'rate',
        title: 'Rate the depth of your spiritual connection today.',
        range: {
          min: 1,
          max: 5,
          step: 1,
        },
      },
    ],
  },
];
