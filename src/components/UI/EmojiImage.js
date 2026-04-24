import React from 'react';
import Image from 'next/image';
import { EMOJI_MAP } from '@/constants/emojis';

/**
 * Renders a colorful emoji as a local PNG (see /public/emoji) with SEO-friendly alt text.
 * @param {string} emoji - Unicode emoji key matching EMOJI_MAP
 * @param {number} [size=20]
 * @param {string} [className]
 * @param {object} [style]
 * @param {string} [alt] - Optional override for context-specific accessible description
 */
const EmojiImage = ({ emoji, size = 20, className = '', style = {}, alt: altProp }) => {
  const emojiData = EMOJI_MAP[emoji];

  if (!emojiData) {
    return (
      <span className={className} style={style} role="img" aria-label={altProp || 'Emoji'}>
        {emoji}
      </span>
    );
  }

  const alt = (altProp && altProp.trim()) || emojiData.alt;

  return (
    <Image
      src={emojiData.src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{
        objectFit: 'contain',
        verticalAlign: 'middle',
        display: 'inline-block',
        ...style
      }}
      unoptimized={true}
    />
  );
};

export default EmojiImage;
