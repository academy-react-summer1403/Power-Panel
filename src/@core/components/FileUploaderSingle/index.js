// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import { FileText, X, DownloadCloud } from "react-feather";

const FileUploaderSingle = ({ files, setFiles, image }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.slice(0, 1));
    },
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="rounded shadow-sm"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="40"
          width="40"
        />
      );
    } else {
      return <FileText size="40" className="text-primary" />;
    }
  };

  const handleRemoveFile = () => {
    setFiles([]); 
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} MB`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} KB`;
    }
  };

  return (
    <Card className="shadow border-0">
      <CardBody>
        <div
          {...getRootProps({ className: "dropzone border border-dashed rounded p-4 bg-light text-center cursor-pointer" })}
        >
          <input {...getInputProps()} />
          <div className="d-flex align-items-center justify-content-center flex-column">
            {image ? (
              <img src={image} className="course-preview-image rounded shadow-sm mb-2" alt="Preview" />
            ) : (
              <DownloadCloud size={64} className="text-primary mb-2" />
            )}
            <h5 className="text-dark">Drag & Drop a File Here or Click to Upload</h5>
            <p className="text-secondary small">
              Only one image can be uploaded. Drop a file here or click to{" "}
              <a href="/" onClick={(e) => e.preventDefault()} className="text-primary">
                browse
              </a>{" "}
              from your system.
            </p>
          </div>
        </div>
        {files.length > 0 && (
          <Fragment>
            <ListGroup className="my-3">
              {files.map((file, index) => (
                <ListGroupItem
                  key={`${file.name}-${index}`}
                  className="d-flex align-items-center justify-content-between bg-light rounded mb-1 p-2 shadow-sm"
                >
                  <div className="file-details d-flex align-items-center">
                    <div className="file-preview me-2">{renderFilePreview(file)}</div>
                    <div>
                      <p className="file-name mb-0 text-primary fw-bold">{file.name}</p>
                      <p className="file-size mb-0 text-muted">{renderFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    color="danger"
                    outline
                    size="sm"
                    className="btn-icon"
                    onClick={handleRemoveFile}
                  >
                    <X size={14} />
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Fragment>
        )}
      </CardBody>
    </Card>
  );
};

export default FileUploaderSingle;
