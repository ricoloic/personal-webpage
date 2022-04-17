import { makeStyles } from '@material-ui/core/styles';

const useSketchCardsStyles = makeStyles({
  container: {
    display: 'grid',
    gap: '1.5rem',
    gridAutoColumns: '1fr',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    width: 'min(95%, 100rem)',
    margin: 'auto',

    '& > a:nth-child(1)': { gridArea: 'one' },
    '& > a:nth-child(2)': { gridArea: 'two' },
    '& > a:nth-child(3)': { gridArea: 'three' },
    '& > a:nth-child(4)': { gridArea: 'four' },
    '& > a:nth-child(5)': { gridArea: 'five' },
    '& > a:nth-child(6)': { gridArea: 'six' },
    '& > a:nth-child(7)': { gridArea: 'seven' },
    '& > a:nth-child(8)': { gridArea: 'eight' },
    '& > a:nth-child(9)': { gridArea: 'nine' },
    '& > a:nth-child(10)': { gridArea: 'ten' },
    '& > a:nth-child(11)': { gridArea: 'eleven' },
    '& > a:nth-child(12)': { gridArea: 'twelve' },
    '& > a:nth-child(13)': { gridArea: 'thirteen' },
    '& > a:nth-child(14)': { gridArea: 'fourteen' },
    '& > a:nth-child(15)': { gridArea: 'fifteen' },

    gridTemplateAreas: `
      "one"
      "two"
      "three"
      "four"
      "five"
      "six"
      "seven"
      "eight"
      "nine"
      "ten"
      "eleven"
      "twelve"
      "thirteen"
      "fourteen"
      "fifteen"
    `,

    '@media (min-width: 33em)': {
      gridTemplateAreas: `
        "one      one"
        "two      three"
        "four     four"
        "five     five"
        "six      six"
        "seven    eight"
        "nine     nine"
        "ten      eleven"
        "twelve   twelve"
        "thirteen thirteen"
        "fourteen fourteen"
        "fifteen fifteen"
      `,
    },

    '@media (min-width: 38em)': {
      gridTemplateAreas: `
        "one      one"
        "two      three"
        "five     three"
        "four     four"
        "six      six"
        "seven    eight"
        "seven    nine"
        "ten      ten"
        "eleven   eleven"
        "twelve   thirteen"
        "twelve   thirteen"
        "fourteen fourteen"
        "fifteen fifteen"
      `,
    },

    '@media (min-width: 54em)': {
      gridTemplateAreas: `
        "one      one      two"
        "five     five     five"
        "three    four     four"
        "six      six      six"
        "seven    seven    nine"
        "eight    eight    nine"
        "thirteen ten      eleven"
        "thirteen twelve   twelve"
        "fourteen fourteen fifteen"
      `,
    },

    '@media (min-width: 75em)': {
      gridTemplateAreas: `
        "one      one      two      five"
        "three    four     four     five"
        "eight    six      six      six"
        "eight    seven    eleven   nine"
        "ten      ten      eleven   twelve"
        "thirteen thirteen thirteen twelve"
        "fourteen fourteen fifteen  fifteen"
      `,
    },
  },
});

export default useSketchCardsStyles;
