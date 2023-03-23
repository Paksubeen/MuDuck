import customAxios from './customAxios';

const token = localStorage.getItem('localToken');

// 뮤지컬정보를 가져오는 api
export const getMusicalDetail = async musicalId => {
  return customAxios({
    method: 'get',
    url: `/musicals/${musicalId}`,
  });
};

// 뮤지컬 출연진 정보 가져오기
export const getActorsDetail = async musicalId => {
  return customAxios({
    method: 'get',
    url: `/musicals/${musicalId}/actors`,
  });
};

// 해당 뮤지컬관련 커뮤니티글 가져오기
export const getRelatedBoard = async musicalId => {
  return customAxios({
    method: 'get',
    url: `/musicals/${musicalId}/board`,
    headers: { Authorization: token },
  });
};
