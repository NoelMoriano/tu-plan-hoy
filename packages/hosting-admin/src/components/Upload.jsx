import React, { useEffect, useState } from "react";
import { buckets } from "../firebase/storage.js";
import {
  ComponentContainer,
  messageAntd,
  modalConfirm,
  notification,
  UploadAntd,
} from "./ui";
import styled from "styled-components";
import {
  deleteFileAndFileThumbFromStorage,
  uploadFile,
} from "./utils/upload/functions";
import {
  PreviewFile,
  UploadBody,
  UploadDraggerBody,
} from "./utils/upload/components";
import { isEmpty } from "lodash";

export const Upload = ({
  accept,
  bucket = "default",
  buttonText = "Subir imagen",
  dragger = true,
  name,
  error,
  filePath,
  fileName,
  isImage = true,
  label,
  required = false,
  resize = null,
  thumbExtension = "webp",
  value,
  onChange,
  onUploading,
}) => {
  const storage = buckets[bucket];

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);

  useEffect(() => {
    if (!value) return;

    setFiles([{ ...value, status: "done" }]);
  }, [JSON.stringify(value)]);

  useEffect(() => {
    onUploading && onUploading(uploading);
  }, [uploading]);

  useEffect(() => {
    const filesDone = files.every((file) => file.status === "success");

    filesDone &&
      onChange(!isEmpty(files) ? uploadFileToFile(files[0]) : undefined);
  }, [JSON.stringify(files)]);

  const uploadFileToFile = ({ uid, name, url, thumbUrl }) => {
    if (!url) throw new Error("Missing url");

    // if (!url) throw Error("Missing url");

    return {
      uid,
      name,
      url,
      thumbUrl,
    };
  };

  const customRequest = async (requestOption) => {
    try {
      setUploading(true);

      const { newFile, status } = await uploadFile({
        filePath,
        fileName,
        resize,
        thumbExtension,
        storage,
        isImage,
        options: {
          file: requestOption.file,
          onError: (error) =>
            requestOption.onError && requestOption.onError(error),
          onProgress: (percent) =>
            requestOption.onProgress &&
            requestOption.onProgress({
              ...new ProgressEvent("load"),
              percent: percent,
            }),
          onSuccess: (message) =>
            requestOption.onSuccess &&
            requestOption.onSuccess(message, new XMLHttpRequest()),
        },
      });

      if (status) return addFileToFiles(newFile);

      await deleteFile(newFile);
    } catch (e) {
      uploadErrorMessage();
      console.error("Upload - custom request", e);
    } finally {
      setUploading(false);
    }
  };

  const uploadErrorMessage = () =>
    notification({
      type: "error",
      title: "Error al cargar el archivo",
      description: "¡Intentar de nuevo!",
    });

  const addFileToFiles = (file) =>
    setFiles((prevFiles) => {
      const index = prevFiles.findIndex(
        (prevFile) => prevFile.uid === file.uid
      );

      const nextFiles = [...prevFiles];

      nextFiles[index] = file;

      return nextFiles;
    });

  const onChangeUpload = ({ file, fileList }) => {
    if (file.status === "done") return;

    setFiles(fileList);
  };

  const onPreview = (file) => setCurrentFile(file);

  const onRemove = async (file) =>
    new Promise((resolve) => {
      modalConfirm({
        content: "La imagen se eliminará.",
        onOk: async () => {
          await deleteFile(file);
          resolve(true);
        },
      });
    });

  const deleteFile = async (file) => {
    await deleteFileAndFileThumbFromStorage(storage, filePath, file.name);

    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.uid !== file.uid)
    );
  };

  const beforeUpload = async () => {
    if (isEmpty(files)) return true;

    await messageAntd.error(
      `¡Elimina el archivo actual antes de cargar un nuevo archivo!`
    );

    return UploadAntd.LIST_IGNORE;
  };

  return (
    <>
      <ComponentContainer.filled
        required={required}
        error={error}
        label={label}
        animation={false}
      >
        <WrapperComponents>
          {dragger ? (
            <UploadAntd.Dragger
              name={name}
              fileList={files}
              listType="picture"
              accept={accept}
              customRequest={customRequest}
              onRemove={onRemove}
              onPreview={onPreview}
              onChange={onChangeUpload}
              beforeUpload={beforeUpload}
            >
              <UploadDraggerBody
                hint="Soportado para subir solo una imagen"
                text="Click aquí o arrastrar para subir la imagen"
              />
            </UploadAntd.Dragger>
          ) : (
            <UploadStyled
              name={name}
              fileList={files}
              listType="picture"
              accept={accept}
              customRequest={customRequest}
              onRemove={onRemove}
              onPreview={onPreview}
              onChange={onChangeUpload}
              beforeUpload={beforeUpload}
            >
              <UploadBody visible={isEmpty(files)} buttonText={buttonText} />
            </UploadStyled>
          )}
        </WrapperComponents>
      </ComponentContainer.filled>
      {currentFile?.url && (
        <PreviewFile
          url={currentFile.url}
          thumbUrl={currentFile?.thumbUrl}
          isImage={isImage}
          onCancel={() => setCurrentFile(null)}
          visible={!!currentFile}
        />
      )}
    </>
  );
};

const WrapperComponents = styled.div`
  margin: 11px;
`;

const UploadStyled = styled(UploadAntd)`
  cursor: pointer;

  .ant-upload.ant-upload-select {
    display: block;

    .ant-upload {
      button {
        text-align: left;
      }
    }
  }

  .ant-upload-list .ant-upload-list-item {
    //margin: 7px 5px;
  }
`;
