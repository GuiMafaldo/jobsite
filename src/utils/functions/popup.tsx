import React from 'react';

interface PopupProps {
    mensagem: string;
    onFechar: () => void;
}

const PopupConfirmacao: React.FC<PopupProps> = ({ mensagem, onFechar }) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h3>{mensagem}</h3>
                <button style={styles.button} onClick={onFechar}>Fechar</button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    popup: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center' as 'center',
        maxWidth: '400px',
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '4px',
        marginTop: '8px'
    }
};

export default PopupConfirmacao;
