import React from 'react';
import { connect } from 'react-redux'
import request from 'superagent'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import Dropzone from 'react-dropzone';
import RenderField from './render-field'
import * as validations from './validations'
import { fetchConfirmationIfNeeded } from '../actions'

class Form extends React.Component {
  submit(values) {
    const { dispatch } = this.props
    dispatch(fetchConfirmationIfNeeded(values.phone))
  }

  onUploadFinish(error, result) {
    this.props.array.push('photos', result.body)
  }

  onUploadClick(e) {
    e.preventDefault()
    this.refs.dropzone.open()
  }

  onAddFiles(files) {
    files.forEach(file => {
      request
        .post('/api/photos/upload')
        .attach('file', file)
        .end(::this.onUploadFinish)
    });
  }

  renderFilePreview(params) {
    return (
      <div className="photo">
        <img src={params.input.value} className="img-responsive" />
      </div>
    )
  }

  renderFiles(params) {
    const { fields, meta } = params
    return (
      <div className="upload-photos">
        {fields.map((field, index) =>
          <Field
            key={index}
            name={`${field}.upload_preview_url`}
            component={this.renderFilePreview}
          />
        )}
        {meta.submitFailed && meta.error && <span className="error">{meta.error}</span>}
      </div>
    )
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props

    return (
      <Dropzone
        ref="dropzone"
        disableClick
        onDrop={( filesToUpload, e ) => ::this.onAddFiles(filesToUpload)}
        className=""
        style={{}}
        >
        <h2>Принять участие</h2>
        <h6>Расскажите немного о себе и своем автомобиле</h6>
        <div className="rd-mailform-container">
          <form method="post" onSubmit={handleSubmit(::this.submit)} className="rd-mailform rd-mailform--skin-1">
            <input type="hidden" name="form-type" value="contact" />
            <div className="form-container">
              <fieldset className="input-container input-container--buxta">
                <div>
                  <Field
                    name="name"
                    component={RenderField}
                    type="text"
                    placeholder="ФИО *"
                    validate={[validations.required]}
                    />
                </div>
                <div>
                  <Field
                    name="phone"
                    component={RenderField}
                    type="text"
                    placeholder="Номер телефона *"
                    validate={[validations.required, validations.phoneRus]}
                    />
                </div>
                <div>
                  <Field
                    name="city"
                    component={RenderField}
                    type="text"
                    placeholder="Город *"
                    validate={[validations.required]}
                    />
                </div>
                <div>
                  <Field
                    name="instagram"
                    component={RenderField}
                    type="text"
                    placeholder="@Instagram"
                    />
                </div>
            </fieldset>
              <label className="form-about" data-add-placeholder="">
              <Field
                name="about"
                component={RenderField}
                type="textarea"
                placeholder="Расскажите о своем автомобиле"
                validate={[validations.required, validations.smallAbout]}
                warn={[validations.warnSmallAbout]}
                />
              </label>
            </div>

            <FieldArray name="photos" component={::this.renderFiles} validate={[validations.requiredPhotos]} />
            <div className="mfControls text-center form-buttons">
              <button className="btn btn-md btn-secondary" onClick={::this.onUploadClick}>Прикрепить фотографии</button>
              <button className="btn btn-md btn-secondary" type="submit" disabled={submitting}>Подать заявку</button>
            </div>
          </form>
        </div>
      </Dropzone>
    )
  }
}

const selector = formValueSelector('register')

Form = reduxForm({
  form: 'register',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(Form);

export default Form
