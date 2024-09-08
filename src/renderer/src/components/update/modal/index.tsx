import type { FC, PropsWithChildren, ReactNode } from 'react'

// flowbite-react
import { Modal as FRModal } from 'flowbite-react'

type ModalTemplateProps = {
  title?: ReactNode
  footer?: ReactNode
  cancelText?: string
  okText?: string
  onCancel?: () => void
  onOk?: () => void
  open: boolean
}

const Modal: FC<ModalTemplateProps & PropsWithChildren> = (props) => {
  const {
    cancelText = 'Cancel',
    children,
    footer,
    okText = 'OK',
    onCancel,
    onOk,
    open,
    title
  } = props

  return (
    <div>
      <FRModal show={open} onClose={onCancel}>
        <FRModal.Header className="p-3">{title}</FRModal.Header>
        <FRModal.Body>
          <div className="space-y-6">{children}</div>
        </FRModal.Body>
        {typeof footer !== 'undefined' ? (
          <FRModal.Footer>
            <button type="button" onClick={onCancel}>
              {cancelText}
            </button>
            <button type="button" onClick={onOk}>
              {okText}
            </button>
          </FRModal.Footer>
        ) : null}
      </FRModal>
    </div>
  )
}

export default Modal
