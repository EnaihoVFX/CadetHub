import { getItemById } from '../data/avatarItems.js'
import './FullBodyAvatar.css'

function classNames(...values) {
  return values.filter(Boolean).join(' ')
}

function buildStyles(equipped) {
  const bodyItem = getItemById(equipped.body)
  const outfitItem = getItemById(equipped.outfit)
  const accessoryItem = getItemById(equipped.accessory)
  const backgroundItem = getItemById(equipped.background)

  const backgroundStyle = backgroundItem?.colors
    ? {
        '--avatar-bg-top': backgroundItem.colors.top,
        '--avatar-bg-bottom': backgroundItem.colors.bottom,
      }
    : undefined

  const bodyStyle = bodyItem?.colors
    ? {
        '--avatar-skin': bodyItem.colors.skin,
        '--avatar-hair': bodyItem.colors.hair,
      }
    : undefined

  const outfitStyle = outfitItem?.colors
    ? {
        '--avatar-outfit-primary': outfitItem.colors.primary,
        '--avatar-outfit-secondary': outfitItem.colors.secondary,
      }
    : undefined

  const accessoryStyle = accessoryItem?.colors
    ? {
        '--avatar-accessory-accent': accessoryItem.colors.accent,
      }
    : undefined

  return {
    backgroundStyle,
    bodyStyle,
    outfitStyle,
    accessoryStyle,
  }
}

function FullBodyAvatar({ equipped, size = 'md', className }) {
  const { backgroundStyle, bodyStyle, outfitStyle, accessoryStyle } = buildStyles(equipped)

  return (
    <div
      className={classNames('full-avatar', `full-avatar--${size}`, className)}
      style={backgroundStyle}
    >
      <div className="full-avatar__stage">
        <div className="full-avatar__shadow" />
        <div className="full-avatar__character" style={bodyStyle}>
          <div className="full-avatar__head">
            <div className="full-avatar__hair" />
            <div className="full-avatar__face">
              <span className="full-avatar__eyes" aria-hidden="true" />
              <span className="full-avatar__mouth" aria-hidden="true" />
            </div>
          </div>
          <div className="full-avatar__torso" style={outfitStyle}>
            <div className="full-avatar__torso-panel" />
          </div>
          <div className="full-avatar__arms" style={outfitStyle}>
            <span className="full-avatar__arm full-avatar__arm--left" />
            <span className="full-avatar__arm full-avatar__arm--right" />
          </div>
          <div className="full-avatar__legs" style={outfitStyle}>
            <span className="full-avatar__leg full-avatar__leg--left" />
            <span className="full-avatar__leg full-avatar__leg--right" />
          </div>
          <div
            className={classNames('full-avatar__accessory', `full-avatar__accessory--${equipped.accessory}`)}
            style={accessoryStyle}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}

export default FullBodyAvatar

