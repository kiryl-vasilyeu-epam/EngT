import { COLORS } from 'constants';
import React from 'react';
import styled from 'styled-components';

const VIDEO_TYPES = ['mp4', 'webm', 'ogg'];
const AUDIO_TYPES = ['mp3', 'wav'];

const Media = ({ src }) => {
  if (src.includes('youtu')) {
    const reg = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?=]*)?/g.exec(src);
    const uSrc = `https://www.youtube.com/embed/${reg?.[1] || 'dQw4w9WgXcQ'}`;

    return (
      <Container>
        <IFrame
          src={uSrc}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        />
      </Container>
    );
  }

  const parts = src.split('.');
  const srcType = parts[parts.length - 1];

  if (VIDEO_TYPES.includes(srcType)) {
    return (
      <Container>
        <Video
          src={src}
          controls
        />
      </Container>
    );
  }

  if (AUDIO_TYPES.includes(srcType)) {
    return (
      <Audio
        src={src}
        controls
      />
    );
  }

  return null;
};

const Container = styled.div`
  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    height: 50vh;
  }

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    width: 100%;
  }

  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    width: 100%;
  }
  aspect-ratio: 16 / 9;
  border-radius: 7px;
  overflow: hidden;
  margin: auto;
  border: 2px solid ${COLORS.BORDER_COLOR}
`;

const IFrame = styled.iframe`
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

const Audio = styled.audio`
  width: 100%;
  border: 2px solid ${COLORS.BORDER_COLOR};
  border-radius: 20px;
`;

export default Media;
