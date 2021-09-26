import { CSS, styled } from 'lib/style'

type Props = {
  isOpen: boolean
  onClose: () => void
  css?: CSS
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, children, css }) => {
  if (!isOpen) return null

  return (
    <Overlay onClick={() => onClose()}>
      <Card
        onClick={(e) => {
          e.stopPropagation()
        }}
        css={css}
      >
        {children}
      </Card>
    </Overlay>
  )
}

const Overlay = styled('div', {
  position: 'fixed',
  zIndex: '$max',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  backgroundColor: 'rgba(0, 0, 0, 0.8)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Card = styled('div', {
  background: '$background',
  border: '1px solid $muted',
  width: '100%',
  maxWidth: '34rem',
  m: '$16',
  borderRadius: '$md',

  maxHeight: 'calc($vh - $space$16 * 2)',
  scrollbarWidth: 'thin',
  overflowY: 'auto',

  '@md': {
    overflowY: 'visible',
  },
})
