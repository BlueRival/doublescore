export default function timer() {

  // account for overhead within this function, this may not be a good idea
  const offset = 1;

  let start = new Date().getTime() + offset;

  return ( reset?: boolean ) => {

    reset = !!reset;

    let diff = new Date().getTime() - start;

    if ( diff < 0 ) {
      diff = 0;
    }

    if ( reset ) {
      start = new Date().getTime() + offset;
    }

    return diff;

  };

}
