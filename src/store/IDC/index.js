const idc = {
  namespaced: true,
  state: {
    Community: {},
    Communityflag: true,
    CommunityType: 'add',
    BuildingDetail: true,
    selectCar: [],
    HouseEnter: [80, 92, 48, 100, 128, 135, 145],
    HouseOut: [80, 52, 58, 153, 100, 56, 100],
  },
  mutations: {
    setCommunity(state, list) {
      Object.assign(state.Community, list);
    },
    setCommunityflag(state, flag) {
      state.Communityflag = flag;
    },
    setCommunityType(state, type) {
      state.CommunityType = type;
    },
    setBuildingDetail(state, flag) {
      state.BuildingDetail = flag;
    },
    setselectCar(state, car) {
      state.selectCar = car;
    },
    setHouseEnter(state) {
      state.HouseEnter++;
    },
    setHouseOut(state) {
      state.HouseOut++;
    },
  },
  actions: {},
};

export default idc;
