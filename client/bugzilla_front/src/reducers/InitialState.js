export const InitialState = {
  loading: false,
  auth: { logged_in: false, redirect: false },
  error: { data: [] },
  projects: {
    current: '',
    data: [],
    developers: [],
    qas: [],
    unassign_developers: [],
    unassign_qas: [],
    assign_bugs:[],
    unassign_bugs:[]
  }
};
