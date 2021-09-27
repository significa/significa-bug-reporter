import { ChangeEvent, useCallback, useEffect, useRef } from 'react'

import { Box, Flex, Link, Text } from 'UI'

export enum Status {
  Queued = 'Queued',
  Pending = 'Pending',
  Success = 'Success',
}

export type Attach = { file: File; status: Status; url: string }

type AttachmentsProps = {
  attachments: Attach[]
  onChange: (attachments: Attach[] | ((prev: Attach[]) => Attach[])) => void
}
export const Attachments = ({
  attachments,
  onChange,
}: AttachmentsProps): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleAttachment = useCallback(async (attachment: Attach) => {
    onChange((prev) =>
      prev.map((curr) =>
        curr.file.name === attachment.file.name
          ? { ...curr, status: Status.Pending }
          : curr
      )
    )

    try {
      const {
        file: { type, name, size },
      } = attachment
      const res = await fetch(
        `/api/upload-url?type=${type}&name=${name}&size=${size}`
      )

      if (!res.ok) {
        throw new Error('Upload URL request failed')
      }

      const { url, asset } = await res.json()
      const uploadRes = await fetch(url, {
        method: 'PUT',
        headers: {
          'content-type': type,
        },
        body: attachment.file,
      })

      if (!uploadRes.ok) {
        throw new Error('Upload failed')
      }

      if (uploadRes.ok) {
        onChange((prev) =>
          prev.map((curr) =>
            curr.file.name === name
              ? { ...curr, status: Status.Success, url: asset }
              : curr
          )
        )
      }
    } catch (error) {
      onChange((prev) => prev.filter((curr) => curr.file !== attachment.file))
    }
  }, [])

  useEffect(() => {
    if (attachments.length > 0) {
      attachments
        .filter(({ status }) => status === Status.Queued)
        .forEach((attachment) => {
          handleAttachment(attachment)
        })
    }
  }, [attachments, handleAttachment])

  return (
    <>
      <Box
        ref={fileInputRef}
        as="input"
        id="attachment"
        type="file"
        multiple
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.currentTarget.files) {
            const files: Attach[] = Array.from(e.currentTarget.files).map(
              (file) => ({
                file,
                status: Status.Queued,
                url: '',
              })
            )
            onChange((prev) => [
              ...prev,
              ...files.filter(
                (curr) =>
                  !prev.some((attach) => attach.file.name === curr.file.name)
              ),
            ])
            // remove the value from the input so we can select the same file again
            if (fileInputRef.current) {
              fileInputRef.current.value = ''
            }
          }
        }}
        css={{
          position: 'absolute',
          opacity: 0,
          zIndex: -1,
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      />
      {attachments.length > 0 && (
        <Box
          as="ul"
          css={{
            mt: '$16',
            border: '1px dashed $muted',
            borderRadius: '$md',
            p: '$16',
          }}
        >
          {attachments.map((attachment) => (
            <Box
              key={attachment.file.name}
              as="li"
              css={{
                opacity: attachment.status === Status.Success ? 1 : 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid $border',
                '&:not(:last-of-type)': {
                  mb: '$16',
                },
              }}
            >
              <Flex css={{ alignItems: 'center' }}>
                {attachment.file.type === 'image/png' && (
                  <Box
                    as="img"
                    src={attachment.url || URL.createObjectURL(attachment.file)}
                    alt={attachment.file.name}
                    css={{
                      mr: '$8',
                      width: '$space$32',
                      height: '$space$32',
                      borderRadius: '$lg',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <Text>{attachment.file.name}</Text>
              </Flex>
              {attachment.status === Status.Success ? (
                <Link
                  color="subtle"
                  role="button"
                  tabIndex={0}
                  css={{ display: 'inline-block' }}
                  onClick={() => {
                    onChange(attachments.filter((a) => a !== attachment))
                  }}
                >
                  Remove
                </Link>
              ) : (
                <Text>Uploading...</Text>
              )}
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}
