export const users = [
    {
        userId: '1',
        username: 'Aaron',
        password:'password',
        email:'email1',
        description: 'Avid Lifter',
        image: 'https://api.tecesports.com/images/general/user.png'
    },
    {
        userId: '2',
        username: 'Dom',
        password:'password',
        email:'email2',
        description: 'Avid Lifter',
        image: 'https://api.tecesports.com/images/general/user.png'
    },
    {
        userId: '3',
        username: 'Ryan',
        password:'password',
        email:'email3',
        description: 'Avid Lifter',
        image: 'https://api.tecesports.com/images/general/user.png'
    },
    {
        userId: '4',
        username: 'Shane',
        password:'password',
        email:'email4',
        description: 'Avid Lifter',
        image: 'https://api.tecesports.com/images/general/user.png'
    },
];

export const exercises = [
    {
        exerciseId: '1',
        name:'Bench Press',
        description: 'Chest exercise'
    },
    {
        exerciseId: '2',
        name:'Incline Bench Press',
        description: 'Upper chest exercise'
    },
    {
        exerciseId: '3',
        name:'Side Lateral Raises',
        description: 'Targets deltoids'
    },
    {
        exerciseId: '4',
        name:'Shoulder Press',
        description: 'Shoulder exercise'
    },
    {
        exerciseId: '5',
        name:'Tricep Pushdowns',
        description: 'Triceps exercise'
    },
    {
        exerciseId: '6',
        name:'Dips',
        description: 'Chest & triceps exercise'
    },
    {
        exerciseId: '7',
        name:'Lat Pull Downs',
        description: "Back exercise"
    },
    {
        exerciseId: '8',
        name:'Bicep Curls',
        description:'Biceps exercise'
    },
    {
        exerciseId: '9',
        name:'Squats',
        description: 'Targets legs'
    }
];


/**
 * only exerciseId and workoutId are entered, exerciseName is obtained
 * from a JOIN to exercises
 */
export const exerciseWorkouts = [
    {
        exerciseWorkoutId: '543f42fe',
        exerciseId: '1',
        exerciseName: 'Bench Press',
        workoutId: '1',
        sets: 4,
        reps: 8
    },
    {
        exerciseWorkoutId: '54gerd2fe',
        exerciseId: '2',
        exerciseName: 'Incline Bench Press',
        workoutId: '1',
        sets: 3,
        reps: 8
    },
    {
        exerciseWorkoutId: 'asfb2fe',
        exerciseId: '3',
        exerciseName: 'Side Lateral Raises',
        workoutId: '1',
        sets: 3,
        reps: 12
    },
    {
        exerciseWorkoutId: 'gsdb554',
        exerciseId: '4',
        exerciseName: 'Shoulder Press',
        workoutId: '1',
        sets: 4,
        reps: 6
    },
    {
        exerciseWorkoutId: '5sdfnb6',
        exerciseId: '5',
        exerciseName: 'Tricep Pushdowns',
        workoutId: '1',
        sets: 3,
        reps: 8
    },
    {
        exerciseWorkoutId: '544f42fe',
        exerciseId: '6',
        exerciseName: 'Dips',
        workoutId: '1',
        sets: 3,
        reps: 8
    },
    {
        exerciseWorkoutId: '543f4436',
        exerciseId: '7',
        exerciseName: 'Lat Pull Downs',
        workoutId: '2',
        sets: 3,
        reps: 8
    },
    {
        exerciseWorkoutId: 'a43f42fe',
        exerciseId: '8',
        exerciseName: 'Bicep Curls',
        workoutId: '2',
        sets: 3,
        reps: 10
    },
    {
        exerciseWorkoutId: '56u74ge',
        exerciseId: '9',
        exerciseName: 'Squats',
        workoutId: '3',
        sets: 5,
        reps: 5
    },
]

export const workouts = [
    {
        workoutId: '1',
        name: 'Push Day',
        description: 'Targets chest, tris, & shoulders',
        isRestDay: false,
        days:1,
        userId: '3'
    },
    {
        workoutId: '2',
        name: 'Pull Day',
        description: 'Targets back & bis',
        isRestDay: false,
        days:1,
        userId: '3'
    },
    {
        workoutId: '3',
        name: 'Leg Day',
        description: 'Targets legs',
        isRestDay: false,
        days:1,
        userId: '3'
    },
    {
        workoutId: '4',
        name: 'Rest Day',
        description: 'Rest Day',
        isRestDay: true,
        days:1,
        userId: '0'
    }
];

export const workoutTracks  = [
    {
        workoutTrackId: 'af435tgf',
        workoutId: '1',
        trackId: '1',
        order: 1,
        day: 1
    },
    {
        workoutTrackId: 'as4htgf',
        workoutId: '2',
        trackId: '1',
        order: 2,
        day: 2
    },
    {
        workoutTrackId: 'af4gsgf',
        workoutId: '3',
        trackId: '1',
        order: 3,
        day: 3
    },
    {
        workoutTrackId: '45hwtgf',
        workoutId: '4',
        trackId: '1',
        order: 4,
        day: 4
    },
];

export const tracks = [
    {
        trackId: '1',
        name: 'Push Pull Legs (PPL)',
        description: 'Good track!',
        userId: '3'
    }
];

export const trackSchedules = [
    {
        trackScheduleId: '23890va',
        trackId: '1',
        scheduleId: '1',
        start: '4/21/2023',
        end: null,
    }
];

export const schedules = [
    {
        scheduleId: '1',
        name: 'Summer Program',
        description: 'Get in shape!',
        image: '',
        userId: '3'
    }
]