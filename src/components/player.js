import React, { useState } from 'react'
import { Divider } from 'antd'
import { PlayButton, Timer, Icons } from 'react-soundplayer/components'
import { withCustomAudio } from 'react-soundplayer/addons'
import classnames from 'classnames'
import {
  PlayCircleOutlined,
  HeartOutlined,
  HeartFilled,
  PauseCircleOutlined,
  RightCircleOutlined,
} from '@ant-design/icons'
import { Slider, Avatar, Typography } from 'antd'
const { VolumeIconSVG, VolumeIconMuteSVG, VolumeIconLoudSVG } = Icons
const AWSSoundPlayer = withCustomAudio(props => {
  const {
    picurl,
    avatarurl,
    content,
    artistsname,
    nickname,
    name,
  } = props.comments
  const { soundCloudAudio, playing, isMuted } = props
  const [like, setLike] = useState(false)
  return (
    <div className="cloud-music-wrap">
      <div className="player">
        <div className="player-content">
          <div className="player-left">
            <img
              src={picurl}
              width={90}
              alt="avatar"
              className={classnames('song-avatar', {
                rotate: playing,
              })}
            />
            <PlayButton {...props} />
          </div>
          <div className="player-right">
            <h3 className="song-name">{name}</h3>
            <p className="singer-name">{artistsname}</p>
            <div className="progress">
              <div className="progress-control">
                <Timer {...props} />
                <Slider
                  value={
                    (soundCloudAudio.audio.currentTime /
                      soundCloudAudio.audio.duration) *
                    100
                  }
                  onChange={val => {
                    soundCloudAudio.audio.currentTime =
                      soundCloudAudio.audio.duration * (val / 100)
                  }}
                />
              </div>
              <div className="volume-control">
                <div className="volume-control-inner">
                  <Slider
                    vertical={true}
                    defaultValue={100}
                    onChange={val => {
                      const volume = val / 100
                      soundCloudAudio.audio.volume = volume
                      if (volume === 0) {
                        soundCloudAudio.audio.muted = true
                      } else {
                        soundCloudAudio.audio.muted = false
                      }
                    }}
                  />
                </div>
                <button
                  className={classnames('volume-button', {
                    'is-muted': isMuted,
                  })}
                  onClick={() => {
                    soundCloudAudio.audio.muted = !isMuted
                  }}
                >
                  {isMuted && (
                    <>
                      <VolumeIconMuteSVG />
                      <VolumeIconSVG />
                    </>
                  )}
                  {!isMuted && <VolumeIconLoudSVG />}
                </button>
              </div>
            </div>
            <div className="toolbar">
              <button
                onClick={() => {
                  if (playing) {
                    soundCloudAudio.pause()
                  } else {
                    soundCloudAudio.play()
                  }
                }}
              >
                {!playing && <PlayCircleOutlined />}
                {playing && <PauseCircleOutlined />}
              </button>
              <button
                onClick={() => {
                  setLike(!like)
                }}
              >
                {!like && <HeartOutlined />}
                {like && (
                  <HeartFilled
                    className={classnames('like', { liked: like })}
                  />
                )}
              </button>
              <button
                onClick={() => {
                  props.onRefresh()
                }}
              >
                <RightCircleOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Divider dashed style={{ margin: '4px 0 ' }} />
      <div className="cloud-music-comments">
        <Avatar src={avatarurl} />
        <div className="cloud-music-content">
          <span className="nickname">{nickname}</span>
          <Typography.Paragraph className="cloud-music-text" copyable>
            {content}
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  )
})

const Player = props => {
  console.log(props.comments)
  const comments = props.comments
  return (
    <AWSSoundPlayer
      streamUrl={comments.url}
      trackTitle={comments.name}
      preloadType="auto"
      comments={props.comments}
      onRefresh={props.onRefresh}
    />
  )
}

export default Player
