import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import PostData, { CommentData } from './ContentData';
import ProfileImg from '../../components/ProfileImg';
import { StyledInput } from '../../components/Input';
import Button from '../../components/Button';
import { MyPageCard } from '../../components/Cards';
import Paging from '../../components/Pagination/Pagination';

function MyPage() {
  const initImage = 'https://cataas.com/cat/pbrosoqOlUUtR5XJ';
  const nickname = '뮤지컬찐덕후';

  const pageSize = 5;
  const pageInfo = {
    page: 1,
    size: pageSize,
    totalElements: PostData.length,
    totalPages: Math.ceil(PostData.length / pageSize),
  };

  const [page, setPage] = useState(pageInfo.page);
  const [currentItems, setCurrentItems] = useState([]);
  const indexOfLastPost = page * pageInfo.size;
  const indexOfFirstPost = indexOfLastPost - pageInfo.size;

  useEffect(() => {
    setCurrentItems(PostData.slice(indexOfFirstPost, indexOfLastPost));
  }, [page, indexOfLastPost, indexOfFirstPost]);

  const [isEdit, setIsEdit] = useState(false);

  const onEditHandler = () => {
    setIsEdit(!isEdit);
  };

  return (
    <MyPageLayout>
      <Category>마이 페이지</Category>
      <ProfileContainer>
        <ProfileImg src={initImage} />
        {isEdit ? (
          <EditNicknameBox>
            <ValidationCheck>
              <EditNickname>닉네임 변경</EditNickname>
              <StyledInput width="260px" height="30px" />
              <ValidationText>이미 있는 닉네임입니다.</ValidationText>
            </ValidationCheck>
            <ButtonContainer>
              <Button
                text="취소"
                bgColor="var(--main-003)"
                hover="var(--main-002)"
                active="var(--main-002)"
                onClick={onEditHandler}
              />
              <Button text="저장" />
            </ButtonContainer>
          </EditNicknameBox>
        ) : (
          <EditNicknameBox>
            <Nickname>{nickname}님</Nickname>
            <EditButton type="button" onClick={onEditHandler}>
              <EditIcon />
            </EditButton>
          </EditNicknameBox>
        )}
      </ProfileContainer>
      <ContentContainer>
        <PostContainer>
          <Title>내가 작성한 글</Title>
          {currentItems.map(post => (
            <MyPageCard key={post.id} width="100%" {...post} />
          ))}
          <Paging
            activePage={page}
            itemsCount={pageInfo.size}
            totalItemCount={pageInfo.totalElements}
            pageRange={pageInfo.totalPages}
            setPage={setPage}
          />
          <Title>내가 스크랩한 글</Title>
          {currentItems.map(post => (
            <MyPageCard key={post.id} width="100%" {...post} />
          ))}
          <Paging
            activePage={page}
            itemsCount={pageInfo.size}
            totalItemCount={pageInfo.totalElements}
            pageRange={pageInfo.totalPages}
            setPage={setPage}
          />
        </PostContainer>
        <CommentContainer>
          <Title>내가 작성한 댓글</Title>
          {CommentData.map(post => (
            <MyPageCard key={post.id} width="100%" {...post} />
          ))}
          <Paging
            activePage={page}
            itemsCount={pageInfo.size}
            totalItemCount={pageInfo.totalElements}
            pageRange={pageInfo.totalPages}
            setPage={setPage}
          />
        </CommentContainer>
      </ContentContainer>
    </MyPageLayout>
  );
}

const MyPageLayout = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    width: 90%;
  }
`;

const Category = styled.h2`
  font-size: var(--font-size-xxl);
  font-weight: bold;
  margin-top: 4rem;
  margin-bottom: 2.4rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
`;

const EditNicknameBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Nickname = styled.div`
  font-size: var(--font-size-xl);
`;

const ValidationCheck = styled.div``;

const EditNickname = styled.div`
  margin-bottom: 8px;
  font-size: var(--font-size-md);
`;

const ValidationText = styled.p`
  margin-top: 8px;
  color: #ea6d1c;
  font-size: var(--font-size-xs);
`;

const ButtonContainer = styled.div`
  display: flex;
  button + button {
    margin-left: 8px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem 2%;
  width: 100%;
  height: 100%;
`;

const PostContainer = styled.section`
  width: 49%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CommentContainer = styled.section`
  width: 49%;
  height: 100%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h3`
  font-size: var(--font-size-md);
  margin-bottom: 8px;
`;

const EditButton = styled.button`
  padding: 0;
  margin-left: 4px;
  border: none;
  background: none;
`;

const EditIcon = styled(HiOutlinePencilAlt)`
  width: 25px;
  height: 25px;
  color: var(--font-color);
  cursor: pointer;
`;

export default MyPage;
