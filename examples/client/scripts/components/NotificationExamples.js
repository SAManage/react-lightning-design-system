import React from 'react';

import { Alert, Toast } from 'react-lightning-design-system';

function onClose() {
  alert('Close requested');
}

export default () => {
  const styles = { padding: '12px' };
  /* eslint-disable max-len */
  return (
    <div>
      <h2 className='slds-m-vertical--medium'>Alerts</h2>
      <div style={ styles }>
        <Alert>This is normal alert without close</Alert>
        <br />
        <Alert type='alert' level='info' icon='info' onClose={ onClose }>This is <b>info</b> alert with icon and close button.</Alert>
        <br />
        <Alert level='info' icon='custom:custom19' onClose={ onClose } description='with description' >This is <b>info with custom icon</b> alert with icon and close button.</Alert>
        <br />
        <Alert level='success' icon='success' onClose={ onClose }>This is <b>success</b> alert with icon and close button.</Alert>
        <br />
        <Alert level='warning' icon='warning' onClose={ onClose }>This is <b>warning</b> alert with icon and close button.</Alert>
        <br />
        <Alert level='error' icon='ban' onClose={ onClose }>This is <b>error</b> alert with icon and close button.</Alert>
        <br />
        <Alert level='offline' icon='offline' onClose={ onClose }>This is <b>offline</b> alert with icon and close button.</Alert>

      </div>
      <h2 className='slds-m-vertical--medium'>Toasts</h2>
      <div style={ styles }>
        <Toast>This is normal toast without close</Toast>
        <br />
        <Toast level='info' icon='info' onClose={ onClose }>This is <b>info</b> alert with icon and close button.</Toast>
        <br />
        <Toast level='info' icon='custom:custom19' onClose={ onClose } description='with description' >This is <b>info with custom icon</b> alert with icon and close button.</Toast>
        <br />
        <Toast level='success' icon='success' onClose={ onClose }>This is <b>success</b> alert with icon and close button.</Toast>
        <br />
        <Toast level='warning' icon='warning' onClose={ onClose }>This is <b>warning</b> alert with icon and close button.</Toast>
        <br />
        <Toast level='error' icon='ban' onClose={ onClose }>This is <b>error</b> alert with icon and close button.</Toast>
      </div>

    </div>
  );
};
