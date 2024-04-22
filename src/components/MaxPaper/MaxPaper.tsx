import React from 'react';
import { Paper, PaperProps } from '@mui/material';
import styles from './MaxPaper.module.scss';
import { Container } from '@mui/system';

interface MaxPaperProps extends PaperProps {
  children?: React.ReactNode;
}

const MaxPaper: React.FC<MaxPaperProps> = ({ children }) => {
  return (
    <Paper elevation={4} className={styles.maxPaper}>
      <Container>{children}</Container>
    </Paper>
  );
};

export default MaxPaper;
