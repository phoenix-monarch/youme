import styled from "styled-components";

export const StyledWatchContent = styled.div`
  padding-top: 20px;
  line-height: 1.7;
  .watch-parameter {
    --gap-space: 32px;
    display: flex;
    gap: var(--gap-space);
    li {
      position: relative;
    }
    li:first-child::before {
      display: none;
    }
    li::before {
      content: "";
      position: absolute;
      left: calc(var(--gap-space) * -1 / 2);
      top: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 100rem;
      background-color: var(--secondary-color);
    }
  }
  .watch-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 20px;
    margin: 14px 0;
    span {
      height: 31px;
      line-height: 31px;
      padding: 0 12px;
      background-color: #434b5a;
      border-radius: 14px;
    }
  }
  .watch-upcoming {
    margin-bottom: 10px;
  }
`;
